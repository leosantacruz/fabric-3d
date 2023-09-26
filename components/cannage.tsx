import { ReactSVG } from 'react-svg';
import svg64 from 'svg64';
import { addTexture, setTexture, setUVscale } from '@/utils/sketchfab';
const Cannage = (props: { color: string; part: string; texture: string }) => {
  const styles = `
        #canne{background:white;display:none}
        .cls-1 {
          fill:${props.color};
        }
        `;

  const generateCannage = async () => {
    if (!props.color) return;
    const svg: any = document.getElementById('canne');
    const base64fromSVG = svg64(svg);
    const id = await addTexture(base64fromSVG);
    await setTexture(props.part, id);
    await setUVscale(props.part);
  };

  return (
    <ReactSVG
      afterInjection={() => {
        generateCannage();
      }}
      beforeInjection={(svg) => {
        let element = svg.querySelector('style') as any;
        element.textContent = styles;
      }}
      style={{ display: 'none' }}
      className="wrapper-class-name"
      desc="Description"
      evalScripts="always"
      fallback={() => <span>Error!</span>}
      httpRequestWithCredentials={true}
      loading={() => <span>Loading</span>}
      onClick={() => {}}
      onError={(error) => {
        console.error(error);
      }}
      renumerateIRIElements={false}
      src={`/images/${props.texture}.svg`}
      title="Title"
      useRequestCache={false}
      wrapper="span"
    />
  );
};

export default Cannage;
