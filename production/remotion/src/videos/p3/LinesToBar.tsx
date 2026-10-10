import {Sequence} from 'remotion';
import {BarChart} from '../../templates/BarChart';
import {Crossfade} from '../../templates/Crossfade';
import {DocumentHighlight} from '../../templates/DocumentHighlight';
import {p3ThreeItemsBar, p3V01} from './shots';

// V-01'in son hali (üç satır vurgulu) → bar. Belgedeki satır sırası = bardaki parça sırası,
// vurgunun kehribarı = en büyük kalemin rengi; izleyici barın o üç satırdan geldiğini görür.
const DOC_TAIL_FROM = 290; // V-01'de üç satırın da vurgulu olduğu an
const DOC_TAIL = 60;

export const P3LinesToBar: React.FC = () => (
  <Crossfade
    aDuration={DOC_TAIL}
    overlap={20}
    a={
      <Sequence from={-DOC_TAIL_FROM}>
        <DocumentHighlight {...p3V01} />
      </Sequence>
    }
    b={<BarChart {...p3ThreeItemsBar} />}
  />
);
