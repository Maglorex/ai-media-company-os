"""Company OS — benchmark katalog derleyici (D-028).
raw/<kanal>.txt (id¦title¦dur¦meta) → <kanal>.csv + catalog-summary.md
Performans kovası kanal içi bağlamla: oran = görüntülenme / kanal medyanı (yalnız public, ≥2 dk).
≥4× BREAKOUT · ≥2× HIGH · 0,5–2× TYPICAL · <0,5× LOWER. 30 günden genç videolar 'GENÇ' notu alır (kova geçici).
Düşük kova ≠ kötü video; konu, tarih, dağıtım farkları ayrıca değerlendirilir.
"""
import csv, io, os, re, statistics, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
TODAY = datetime.date(2026, 10, 11)
CHANNELS = {
    'mustard': 'Mustard', 'paper-skies': 'Paper Skies', 'modern-mba': 'Modern MBA',
    'fern': 'fern', 'persimmon-archive': 'Persimmon Archive', 'ruined-america': 'Ruined America',
}

def views(meta):
    m = re.search(r'(?:^|\|)([\d.,]+)([KMB]?)(?:\||$)', meta)
    if not m:
        return None
    n = float(m.group(1).replace(',', ''))
    return int(n * {'': 1, 'K': 1e3, 'M': 1e6, 'B': 1e9}[m.group(2)])

def age_days(meta):
    m = re.search(r'(\d+)\s*(h|d|w|mo|y)\s*ago', meta)
    if not m:
        return None
    n, u = int(m.group(1)), m.group(2)
    return {'h': 0, 'd': n, 'w': 7 * n, 'mo': 30 * n, 'y': 365 * n}[u]

def secs(d):
    p = [int(x) for x in d.split(':')] if d and re.match(r'^\d+(:\d+)+$', d) else []
    s = 0
    for x in p:
        s = s * 60 + x
    return s or None

PATTERNS = [
    ('WHAT_HAPPENED', r'what (really )?happened to|what went (so )?wrong'),
    ('RISE_FALL', r'rise (and|&) fall|the fall of|extinction of|went bankrupt|failed|collapse'),
    ('WHY_QUESTION', r'^why |^why\b|so why|— why|why did|why is|why are'),
    ('HOW_MECHANISM', r'^how |really make money|economics of|business of'),
    ('MONEY_NUMBER', r'\$[\d.,]+|billion|million'),
    ('SUPERLATIVE', r'most |largest|fastest|biggest|deadliest|strangest|insane|craziest|worst'),
    ('PARADOX_BUT', r' — but | but |worked|then |couldn.t|wasn.t'),
    ('HUNT_INVESTIGATION', r'hunt for|exposing|investigat|secret|decoding|inside '),
    ('ACCIDENT_IRONY', r'accident|hilarious|ridiculous|own (warship|aircraft|legend)|shot itself|by accident'),
]

def patterns(t):
    tl = t.lower()
    return ';'.join(k for k, rx in PATTERNS if re.search(rx, tl)) or 'OTHER'

def bucket(r):
    if r is None:
        return 'N/A'
    if r >= 4: return 'BREAKOUT'
    if r >= 2: return 'HIGH'
    if r >= 0.5: return 'TYPICAL'
    return 'LOWER'

summary = ['# Benchmark katalog özeti', '', '> Üretim: `build_catalog.py` · kaynak: `raw/` (2026-10-11) · kova = görüntülenme / kanal medyanı (public, ≥2 dk). **Kova bir kalite yargısı değildir.**', '']
for slug, name in CHANNELS.items():
    rows = []
    with io.open(os.path.join(HERE, 'raw', slug + '.txt'), encoding='utf-8') as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            parts = line.rstrip('\n').split('¦')
            vid, title, dur, meta = (parts + ['', '', '', ''])[:4]
            rows.append(dict(id=vid, title=title, dur=dur, meta=meta))
    for r in rows:
        r['views'] = views(r['meta'])
        r['age_days'] = age_days(r['meta'])
        r['sec'] = secs(r['dur'])
        r['members_only'] = 'MEMBERS' in r['meta'] or r['views'] is None
    elig = [r['views'] for r in rows if r['views'] and r['sec'] and r['sec'] >= 120]
    med = statistics.median(elig) if elig else None
    out = os.path.join(HERE, slug + '.csv')
    with io.open(out, 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f)
        w.writerow(['channel', 'video_id', 'title', 'approx_publish_date', 'age_label', 'duration', 'duration_sec', 'views',
                    'views_vs_channel_median', 'performance_bucket', 'title_patterns', 'format', 'thumbnail', 'url', 'notes'])
        for r in rows:
            ratio = (r['views'] / med) if (r['views'] and med) else None
            notes = []
            if r['members_only']: notes.append('members-only/no views')
            if r['sec'] and r['sec'] < 120: notes.append('short/announcement (kova dışı)')
            if r['age_days'] is not None and r['age_days'] < 30: notes.append('GENÇ (<30 gün, kova geçici)')
            fmt = 'long-form' if (r['sec'] or 0) >= 600 else ('mid' if (r['sec'] or 0) >= 120 else 'short')
            pub = (TODAY - datetime.timedelta(days=r['age_days'])).isoformat() if r['age_days'] is not None else ''
            age_lbl = (re.search(r'\d+\s*(?:h|d|w|mo|y)\s*ago', r['meta']) or [''])[0]
            w.writerow([name, r['id'], r['title'], pub, age_lbl, r['dur'], r['sec'] or '', r['views'] or '',
                        f'{ratio:.2f}' if ratio else '', bucket(ratio) if (r['sec'] or 0) >= 120 and not r['members_only'] else 'N/A',
                        patterns(r['title']), fmt, f'https://i.ytimg.com/vi/{r["id"]}/hqdefault.jpg',
                        f'https://www.youtube.com/watch?v={r["id"]}', '; '.join(notes)])
    cnt = {}
    for r in rows:
        ratio = (r['views'] / med) if (r['views'] and med) else None
        b = bucket(ratio) if (r['sec'] or 0) >= 120 and not r['members_only'] else 'N/A'
        cnt[b] = cnt.get(b, 0) + 1
    durs = [r['sec'] for r in rows if r['sec'] and r['sec'] >= 120]
    pat = {}
    for r in rows:
        for p in patterns(r['title']).split(';'):
            pat[p] = pat.get(p, 0) + 1
    top = sorted([r for r in rows if r['views']], key=lambda r: -r['views'])[:3]
    low = sorted([r for r in rows if r['views'] and (r['sec'] or 0) >= 120 and (r['age_days'] or 0) >= 30], key=lambda r: r['views'])[:2]
    summary += [f'## {name}', f'- Listelenen: {len(rows)} · medyan görüntülenme (public ≥2 dk): {int(med) if med else "—"} · medyan süre: {int(statistics.median(durs)//60) if durs else "—"} dk',
                f'- Kovalar: ' + ', '.join(f'{k} {v}' for k, v in sorted(cnt.items())),
                f'- Başlık kalıpları: ' + ', '.join(f'{k} {v}' for k, v in sorted(pat.items(), key=lambda x: -x[1])),
                f'- En yüksek: ' + ' · '.join(f'"{r["title"]}" ({r["views"]:,})' for r in top),
                f'- Düşük (≥30 gün): ' + ' · '.join(f'"{r["title"]}" ({r["views"]:,})' for r in low), '']
with io.open(os.path.join(HERE, 'catalog-summary.md'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(summary))
print('\n'.join(summary))
