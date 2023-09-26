import Preloader from '@/components/elements/preloader';
const loadingScreen = () => {
  return (
    <>
      <div id="loadingScreen">
        <div>
          <img src="/images/logo.svg" alt="" />
          <br />
          <br />
          <Preloader width={'50px'} height={'50px'} />
          <div>Chargement de la scène...</div>
        </div>
      </div>
    </>
  );
};

export default loadingScreen;
