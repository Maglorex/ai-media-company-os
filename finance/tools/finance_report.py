"""Company OS finance report (stdlib only).

Usage (repo root):
  python finance/tools/finance_report.py --month 2026-10   # monthly P&L + cash flow
  python finance/tools/finance_report.py --videos          # per-video economics
  python finance/tools/finance_report.py --tax 2026        # Tax Watch threshold proximity
  python finance/tools/finance_report.py --check           # data quality check

Reads finance/ledgers/*.csv, finance/tax-watch/thresholds.csv and
intelligence/growth/data/video-metrics.csv. Writes nothing.
"""
import argparse
import csv
import os
import sys
from collections import defaultdict

ROOT = os.environ.get("COMPANY_OS_ROOT") or os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LEDGERS = os.path.join(ROOT, "finance", "ledgers")
THRESHOLDS = os.path.join(ROOT, "finance", "tax-watch", "thresholds.csv")
METRICS = os.path.join(ROOT, "intelligence", "growth", "data", "video-metrics.csv")
ALERT_LEVELS = (50, 75, 90)


def read(path):
    if not os.path.exists(path):
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return [r for r in csv.DictReader(f) if any((v or "").strip() for v in r.values())]


def num(value):
    try:
        return float(str(value).replace(",", "").strip())
    except (TypeError, ValueError):
        return None


def month_of(date):
    return (date or "")[:7]


def tl(value):
    return f"{value:,.2f} TL".replace(",", "X").replace(".", ",").replace("X", ".")


def load():
    return {
        "expenses": read(os.path.join(LEDGERS, "expenses.csv")),
        "revenue": read(os.path.join(LEDGERS, "revenue.csv")),
        "usage": read(os.path.join(LEDGERS, "usage.csv")),
        "time": read(os.path.join(LEDGERS, "time.csv")),
        "estimates": read(os.path.join(LEDGERS, "estimates.csv")),
        "fx": read(os.path.join(LEDGERS, "fx.csv")),
        "unit_values": read(os.path.join(LEDGERS, "unit-values.csv")),
        "thresholds": read(THRESHOLDS),
        "metrics": read(METRICS),
    }


def check(d):
    problems = []
    for r in d["expenses"]:
        if num(r.get("amount_try")) is None:
            problems.append(f"Gider {r.get('id')}: amount_try eksik (kur girilmeli)")
        if not (r.get("evidence") or "").strip():
            problems.append(f"Gider {r.get('id')}: evidence eksik")
        if r.get("allocation") == "video" and not r.get("video_id"):
            problems.append(f"Gider {r.get('id')}: allocation=video ama video_id yok")
    for r in d["revenue"]:
        if num(r.get("gross_try")) is None:
            problems.append(f"Gelir {r.get('id')}: gross_try eksik")
        if (r.get("dedicated_account") or "").lower() != "yes":
            problems.append(f"Gelir {r.get('id')}: özel hesaba gelmedi / belirtilmedi (Tax Watch)")
    return problems


def fixed_allocation(d, month):
    """Share of the month's fixed costs per video, by video-linked hours."""
    fixed = sum(num(r["amount_try"]) or 0 for r in d["expenses"]
                if r.get("cost_type") == "fixed" and (r.get("period") or month_of(r.get("date"))) == month)
    hours = defaultdict(float)
    for r in d["time"]:
        if month_of(r.get("date")) == month:
            key = r.get("video_id") if r.get("allocation") == "video" and r.get("video_id") else "_genel"
            hours[key] += num(r.get("hours")) or 0
    total = sum(hours.values())
    if not total:
        return fixed, {}
    return fixed, {k: fixed * h / total for k, h in hours.items() if k != "_genel"}


def unit_value(d, service, unit, month):
    for r in d["unit_values"]:
        if r.get("service") == service and r.get("unit") == unit and r.get("period") == month:
            return num(r.get("try_per_unit"))
    return None


def report_month(d, month):
    exp = [r for r in d["expenses"] if (r.get("period") or month_of(r.get("date"))) == month]
    rev = [r for r in d["revenue"] if r.get("period") == month]
    by_type = defaultdict(float)
    by_cat = defaultdict(float)
    for r in exp:
        by_type[r.get("cost_type") or "?"] += num(r.get("amount_try")) or 0
        by_cat[r.get("category") or "?"] += num(r.get("amount_try")) or 0
    revenue = sum(num(r.get("gross_try")) or 0 for r in rev)
    opex = by_type["fixed"] + by_type["variable"]
    print(f"== P&L {month} (tahakkuk: hizmet/kazanç ayı) ==")
    print(f"Gelir (brüt): {tl(revenue)}")
    for t in ("fixed", "variable", "one_time"):
        print(f"Gider {t}: {tl(by_type[t])}")
    print(f"Faaliyet sonucu (gelir - sabit - değişken): {tl(revenue - opex)}")
    print(f"Tek seferlik yatırım sonrası: {tl(revenue - opex - by_type['one_time'])}")
    for c, v in sorted(by_cat.items()):
        print(f"  kategori {c}: {tl(v)}")

    cash_out = sum(num(r.get("amount_try")) or 0 for r in d["expenses"] if month_of(r.get("paid_date")) == month)
    cash_in = sum(num(r.get("net_received_try")) or 0 for r in d["revenue"] if month_of(r.get("received_date")) == month)
    print(f"\n== Nakit akışı {month} (banka/kart tarihi) ==")
    print(f"Giriş (net): {tl(cash_in)} · Çıkış: {tl(cash_out)} · Net: {tl(cash_in - cash_out)}")

    est = [r for r in d["estimates"] if r.get("month") == month]
    if est:
        lo = sum(num(r.get("estimate_low_try")) or 0 for r in est)
        hi = sum(num(r.get("estimate_high_try")) or 0 for r in est)
        print(f"\nTahmin (ay): {tl(lo)} – {tl(hi)} · Gerçek gider: {tl(sum(by_type.values()))}")
    fixed, alloc = fixed_allocation(d, month)
    print(f"\nSabit gider dağıtımı: toplam {tl(fixed)}; videolara: "
          + (", ".join(f"{k} {tl(v)}" for k, v in alloc.items()) or "saat kaydı yok → dağıtılmadı"))


def video_ids(d):
    ids = set()
    for key in ("expenses", "revenue", "usage", "time", "estimates", "metrics"):
        ids.update(r.get("video_id") for r in d[key] if r.get("video_id"))
    return sorted(ids)


def latest_fx(d, currency="USD"):
    rows = sorted((r for r in d["fx"] if r.get("currency") == currency), key=lambda r: r.get("date", ""))
    return num(rows[-1]["try_rate"]) if rows else None


def report_videos(d, rpm_bands):
    months = sorted({month_of(r.get("date")) for r in d["time"]} |
                    {r.get("period") or month_of(r.get("date")) for r in d["expenses"]})
    allocated = defaultdict(float)
    for m in months:
        for vid, v in fixed_allocation(d, m)[1].items():
            allocated[vid] += v
    usd = latest_fx(d)
    for vid in video_ids(d):
        direct = sum(num(r.get("amount_try")) or 0 for r in d["expenses"]
                     if r.get("video_id") == vid and r.get("allocation") == "video")
        econ, unpriced = 0.0, []
        for r in d["usage"]:
            if r.get("video_id") != vid:
                continue
            uv = unit_value(d, r.get("service"), r.get("unit"), month_of(r.get("date")))
            if uv is None:
                unpriced.append(f"{r.get('service')} {r.get('quantity')} {r.get('unit')}")
            else:
                econ += uv * (num(r.get("quantity")) or 0)
        full = direct + econ + allocated[vid]
        revenue = sum(num(r.get("gross_try")) or 0 for r in d["revenue"] if r.get("video_id") == vid)
        f_hours = sum(num(r.get("hours")) or 0 for r in d["time"] if r.get("video_id") == vid and r.get("person") == "founder")
        est = [r for r in d["estimates"] if r.get("video_id") == vid]
        print(f"== {vid} ==")
        print(f"Doğrudan nakit: {tl(direct)} · Doğrudan ekonomik (kota payı): {tl(econ)} · Dağıtılmış sabit: {tl(allocated[vid])}")
        if unpriced:
            print(f"  Fiyatlanmamış kullanım (unit-values.csv eksik): {'; '.join(unpriced)}")
        print(f"Tam yüklü maliyet: {tl(full)} · Gelir: {tl(revenue)} · Kâr/zarar: {tl(revenue - full)}")
        print(f"Founder saati (ölçülen kayıt): {f_hours:g}")
        for r in est:
            print(f"  Tahmin {r.get('category')}: TRY {r.get('estimate_low_try') or '-'}–{r.get('estimate_high_try') or '-'}, "
                  f"saat {r.get('estimate_low_hours') or '-'}–{r.get('estimate_high_hours') or '-'} ({r.get('basis')})")
        if full > 0 and usd:
            bands = ", ".join(f"RPM {b:g}$ → {full / (b * usd / 1000):,.0f} izlenme".replace(",", ".") for b in rpm_bands)
            print(f"Break-even (senaryo, RPM bilinmiyor): {bands}")
        elif full > 0:
            print("Break-even: fx.csv'de USD kuru yok")


def report_tax(d, year):
    rows = [r for r in d["revenue"] if (r.get("received_date") or "").startswith(str(year))]
    gross = sum(num(r.get("gross_try")) or 0 for r in rows)
    withheld = sum(num(r.get("bank_withholding_try")) or 0 for r in rows)
    outside = [r.get("id") for r in rows if (r.get("dedicated_account") or "").lower() != "yes"]
    by_source = defaultdict(float)
    for r in rows:
        by_source[r.get("source") or "?"] += num(r.get("gross_try")) or 0
    print(f"== Tax Watch {year} ==")
    print(f"Yıl içi tahsil edilen brüt hasılat: {tl(gross)} · Banka stopajı: {tl(withheld)}")
    for s, v in sorted(by_source.items()):
        print(f"  {s}: {tl(v)}")
    if outside:
        print(f"UYARI: Özel hesap dışı / belirtilmemiş tahsilat: {', '.join(outside)} → muhasebeci teyidi")
    for t in d["thresholds"]:
        if t.get("year") != str(year):
            continue
        limit = num(t.get("amount_try"))
        if not limit:
            continue
        pct = 100 * gross / limit
        level = max([lv for lv in ALERT_LEVELS if pct >= lv], default=0)
        flag = "EŞİK AŞILDI" if pct >= 100 else (f"%{level} uyarı seviyesi" if level else "normal")
        print(f"{t.get('rule_id')}: {t.get('description')} = {tl(limit)} [{t.get('status')}] → %{pct:.1f} · {flag}")
        if t.get("status") != "verified":
            print(f"  Not: eşik resmî kaynaktan doğrulanmadı (sonraki kontrol {t.get('next_check')})")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--month")
    p.add_argument("--videos", action="store_true")
    p.add_argument("--tax", type=int)
    p.add_argument("--check", action="store_true")
    p.add_argument("--rpm", default="1,3,6", help="break-even RPM bands in USD")
    a = p.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    d = load()
    if a.check or not (a.month or a.videos or a.tax):
        problems = check(d)
        print("Veri kontrolü: " + ("temiz" if not problems else f"{len(problems)} sorun"))
        for x in problems:
            print(" - " + x)
    if a.month:
        report_month(d, a.month)
    if a.videos:
        report_videos(d, [float(x) for x in a.rpm.split(",")])
    if a.tax:
        report_tax(d, a.tax)


if __name__ == "__main__":
    main()
