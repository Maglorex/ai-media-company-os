import {Composition} from 'remotion';
import {EncodeTest} from './EncodeTest';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EncodeTest"
      component={EncodeTest}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
