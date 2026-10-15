// CAL-S5 calibration entry point (separate from src/index.ts so no legacy P3 composition is bundled).
// Render: npx.cmd remotion render src/calibration/index.ts <Comp> <out> --public-dir=D:\CompanyOS-Production\CAL-S5\05_projects\public
import {registerRoot} from 'remotion';
import {CalibrationRoot} from './Root';

registerRoot(CalibrationRoot);
