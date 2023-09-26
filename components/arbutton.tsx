import Image from 'next/image';
import arbuttonimage from 'public/img/ar.svg';
const arbutton = () => {
  const redirect = () => {
    window.location.href =
      'https://sketchfab.com/models/7843865a74e8444db9f1c22f0b0f5991/ar-redirect';
  };
  return (
    <>
      <div id="ARbutton" onClick={redirect}>
        <Image alt="AR button" src={arbuttonimage}></Image>
      </div>
    </>
  );
};

export default arbutton;
