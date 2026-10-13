import {Composition} from 'remotion';
import {EncodeTest} from './EncodeTest';
import {BrandProof} from './brand/BrandProof';
import {BarChart} from './templates/BarChart';
import {ComponentSchematic} from './templates/ComponentSchematic';
import {DocumentHighlight} from './templates/DocumentHighlight';
import {EquationCard} from './templates/EquationCard';
import {FlowDiagram} from './templates/FlowDiagram';
import {LoadShare} from './templates/LoadShare';
import {LocatorMap} from './templates/LocatorMap';
import {QuoteCard} from './templates/QuoteCard';
import {ScopeCard} from './templates/ScopeCard';
import {SourceLabel} from './templates/SourceLabel';
import {Timeline} from './templates/Timeline';
import {UnitGrid} from './templates/UnitGrid';
import {P3FinalFrame} from './videos/p3/FinalFrame';
import {P3LinesToBar} from './videos/p3/LinesToBar';
import {prerollClip, syncedClips} from './videos/p3/synced';
import {ANIMATIC_FRAMES, P3Animatic} from './videos/p3/Animatic';
import {p3V01Teaser, p3Contracts, p3FuelElements, p3PassengerCargo, p3QuoteReliable, p3Strip, p3V03Cover, p3V14LayUp, p3V18Prototype, p3VoyageMap, p3WorkedMeans, p3CrewBar, p3NetCost, p3NetCostBar, p3NotIncluded, p3Q02FullCost, p3Subsidy, p3TwoMillionMore, p3V12OneShip, p3Facility, p3FacilityTimeline, p3GalvestonMap, p3LabelV05, p3LoneShip, p3NotInReport, p3PortFlow, p3TrainingFlow, p3ThreeItemsBar, p3V01, p3V02} from './videos/p3/shots';

const FPS = 30;
const HD = {fps: FPS, width: 1920, height: 1080} as const;

// Görüntüler repo dışından gelir: render'da --public-dir=<video üretim klasörü>\01_archive.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="EncodeTest" component={EncodeTest} durationInFrames={300} {...HD} />
      {/* Brand System v1: genel token + yerel font proof'u (src/brand/; video içeriği yok) */}
      <Composition id="Brand-Tokens-Proof" component={BrandProof} durationInFrames={1} {...HD} />

      {/* P3 — NS Savannah */}
      <Composition id="P3-S1-V01Teaser" component={DocumentHighlight} durationInFrames={120} {...HD} defaultProps={p3V01Teaser} />
      <Composition id="P3-S8-FinalFrame" component={P3FinalFrame} durationInFrames={150} {...HD} />
      <Composition id="P3-S1-VoyageMap" component={LocatorMap} durationInFrames={210} {...HD} defaultProps={p3VoyageMap} />
      <Composition id="P3-S1-QuoteReliable" component={QuoteCard} durationInFrames={150} {...HD} defaultProps={p3QuoteReliable} />
      <Composition id="P3-V03-Cover" component={DocumentHighlight} durationInFrames={210} {...HD} defaultProps={p3V03Cover} />
      <Composition id="P3-V18-Prototype" component={DocumentHighlight} durationInFrames={270} {...HD} defaultProps={p3V18Prototype} />
      <Composition id="P3-S2-PassengerCargo" component={ScopeCard} durationInFrames={240} {...HD} defaultProps={p3PassengerCargo} />
      <Composition id="P3-S2-Contracts" component={FlowDiagram} durationInFrames={240} {...HD} defaultProps={p3Contracts} />
      <Composition id="P3-S3-FuelElements" component={UnitGrid} durationInFrames={210} {...HD} defaultProps={p3FuelElements} />
      <Composition id="P3-S3-WorkedMeans" component={ScopeCard} durationInFrames={210} {...HD} defaultProps={p3WorkedMeans} />
      <Composition id="P3-V14-LayUp" component={DocumentHighlight} durationInFrames={210} {...HD} defaultProps={p3V14LayUp} />
      <Composition id="P3-S8-Strip" component={Timeline} durationInFrames={240} {...HD} defaultProps={p3Strip} />
      <Composition id="P3-S4-NetCost" component={EquationCard} durationInFrames={180} {...HD} defaultProps={p3NetCost} />
      <Composition id="P3-S4-NotIncluded" component={ScopeCard} durationInFrames={210} {...HD} defaultProps={p3NotIncluded} />
      <Composition id="P3-S4-NetCostBar" component={BarChart} durationInFrames={150} {...HD} defaultProps={p3NetCostBar} />
      <Composition id="P3-S4-Subsidy" component={EquationCard} durationInFrames={240} {...HD} defaultProps={p3Subsidy} />
      <Composition id="P3-S4-TwoMillionMore" component={EquationCard} durationInFrames={270} {...HD} defaultProps={p3TwoMillionMore} />
      <Composition id="P3-V12-OneShipSystem" component={DocumentHighlight} durationInFrames={210} {...HD} defaultProps={p3V12OneShip} />
      <Composition id="P3-Q02-FullCost" component={DocumentHighlight} durationInFrames={210} {...HD} defaultProps={p3Q02FullCost} />
      <Composition id="P3-V02-DigestP1" component={DocumentHighlight} durationInFrames={330} {...HD} defaultProps={p3V02} />
      <Composition id="P3-V01-ThreeLines" component={DocumentHighlight} durationInFrames={360} {...HD} defaultProps={p3V01} />
      <Composition id="P3-Label-V05" component={SourceLabel} durationInFrames={180} {...HD} defaultProps={p3LabelV05} />
      <Composition id="P3-ThreeItemsBar" component={BarChart} durationInFrames={270} {...HD} defaultProps={p3ThreeItemsBar} />
      <Composition id="P3-LinesToBar" component={P3LinesToBar} durationInFrames={310} {...HD} />
      <Composition id="P3-NotInReport" component={ScopeCard} durationInFrames={240} {...HD} defaultProps={p3NotInReport} />
      <Composition id="P3-CrewBar" component={BarChart} durationInFrames={180} {...HD} defaultProps={p3CrewBar} />
      <Composition id="P3-TrainingFlow" component={FlowDiagram} durationInFrames={300} {...HD} defaultProps={p3TrainingFlow} />
      <Composition id="P3-PortFlow" component={FlowDiagram} durationInFrames={270} {...HD} defaultProps={p3PortFlow} />
      <Composition id="P3-GalvestonMap" component={LocatorMap} durationInFrames={150} {...HD} defaultProps={p3GalvestonMap} />
      <Composition id="P3-Facility" component={ComponentSchematic} durationInFrames={330} {...HD} defaultProps={p3Facility} />
      <Composition id="P3-FacilityTimeline" component={Timeline} durationInFrames={330} {...HD} defaultProps={p3FacilityTimeline} />
      <Composition id="P3-LoneShip" component={LoadShare} durationInFrames={420} {...HD} defaultProps={p3LoneShip} />

      <Composition id="P3-ANIMATIC" component={P3Animatic} durationInFrames={ANIMATIC_FRAMES} {...HD} />
      {/* P3 kurgu sürümleri: VO senkron (videos/p3/synced.ts, voCues.ts) */}
      <Composition id={prerollClip.id} component={prerollClip.component} durationInFrames={prerollClip.durationInFrames} {...HD} defaultProps={prerollClip.props} />
      {syncedClips.map((c) => (
        <Composition key={c.id} id={c.id} component={c.component} durationInFrames={c.durationInFrames} {...HD} defaultProps={c.props ?? {}} />
      ))}
    </>
  );
};
