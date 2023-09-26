import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import svg64 from 'svg64';

//Components
import Scenarios from '@/components/steps/scenarios';
import CustomOptions from '@/components/steps/options';
import SidebarFooter from '@/components/sidebarFooter';

import Cannage from '@/components/cannage';

import { emissionAnimation, getCamera, setCamera } from '@/utils/sketchfab';

interface Props {
  changeScenario: (val: string) => void;
}

const Sidebar = (props: Props) => {
  const [step, setStep] = useState(1);
  const [color, setColor] = useState('');
  const [part, setPart] = useState('Sillon');
  const [cannage, setCannage] = useState('cannage1');

  const emissionHoveranimation = (part: string) => {
    emissionAnimation(part);
  };

  const cameras = {
    sillon: {
      position: [2.2477143911378676, 1.033487909245169, 1.5497735381492421],
      target: [0.3512821167041105, 1.4541253606331352, 0.8878835087938001]
    },
    alfombra: {
      position: [1.628295159549282, 0.3583908112864751, 2.0626571609309647],
      target: [0.3512821167041105, 1.4541253606331352, 0.8878835087938001]
    },
    cortinas: {
      position: [0.978001885107671, -0.5000271359434478, 0.8878835087938001],
      target: [0.3512821167041105, 1.4541253606331352, 0.8878835087938001]
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebarBox">
          <Cannage color={color} part={part} texture={cannage}></Cannage>
          <div className="sideHeader">
            <div
              className={step >= 1 ? 'step active' : 'step'}
              onClick={() => {
                setStep(1);
              }}
            >
              <img src="/images/step1.svg" width="18px" />
              <div className="stepName">Choisir un objet</div>
            </div>
            <div className="line"></div>
            <div
              className={step >= 2 ? 'step active' : 'step'}
              onClick={() => {
                setStep(2);
              }}
            >
              <img src="/images/step2.svg" width="18px" />
              <div className="stepName">Choisir un modèle</div>
            </div>
            <div className="line"></div>

            <div
              className={step == 3 ? 'step active' : 'step'}
              onClick={() => {
                setStep(3);
              }}
            >
              <img src="/images/step3.svg" width="18px" />
              <div className="stepName">Choisir une couleur</div>
            </div>
          </div>
          <div className="sidebarContent">
            {step == 1 && (
              <div className="stepContent">
                <div
                  className={`option`}
                  onClick={() => {
                    setColor('');
                    setPart('Sillon');
                    setStep(2);
                    setCamera(cameras['sillon']);
                  }}
                  onMouseEnter={() => {
                    emissionHoveranimation('Sillon');
                  }}
                >
                  <img src="/images/canape.svg" alt="" />
                  <div className="stepName">Canapé</div>
                </div>

                <div
                  className={`option`}
                  onClick={() => {
                    setColor('');
                    setPart('Alfombra');
                    setStep(2);
                    setCamera(cameras['alfombra']);
                  }}
                  onMouseEnter={() => {
                    emissionHoveranimation('Alfombra');
                  }}
                >
                  <img src="/images/tapis.svg" alt="" />
                  <div className="stepName">Tapis</div>
                </div>

                <div
                  className={`option`}
                  onClick={() => {
                    setColor('');
                    setPart('Cortinas');
                    setStep(2);
                    setCamera(cameras['cortinas']);
                  }}
                  onMouseEnter={() => {
                    emissionHoveranimation('Cortinas');
                  }}
                >
                  <img src="/images/rideau.svg" alt="" />
                  <div className="stepName">Rideau</div>
                </div>
              </div>
            )}
            {step == 2 && (
              <div className="stepContent">
                <div
                  className="option"
                  onClick={() => {
                    //setCannage('Cortinas');
                    setStep(3);
                    setCannage('cannage1');
                  }}
                >
                  <img src="/images/cannage1.jpg" alt="Cannage 1" width="70px" />
                </div>

                <div
                  className="option"
                  onClick={() => {
                    //setCannage('Cortinas');
                    setStep(3);
                    setCannage('cannage2');
                  }}
                >
                  <img src="/images/cannage2.jpg" alt="Cannage 2" width="70px" />
                </div>
              </div>
            )}
            {step == 3 && (
              <div className="stepContent">
                <div
                  className="option"
                  onClick={() => {
                    setColor('#9C0100');
                  }}
                >
                  <div className="color" style={{ background: '#9C0100' }}></div>
                </div>

                <div
                  className="option"
                  onClick={() => {
                    setColor('#C4BCAA');
                  }}
                >
                  <div className="color" style={{ background: '#C4BCAA' }}></div>
                </div>

                <div
                  className="option"
                  onClick={() => {
                    setColor('#829E7B');
                  }}
                >
                  <div className="color" style={{ background: '#829E7B' }}></div>
                </div>

                <div
                  className="option"
                  onClick={() => {
                    setColor('#15305B');
                  }}
                >
                  <div className="color" style={{ background: '#15305B' }}></div>
                </div>

                <div
                  className="option"
                  onClick={() => {
                    setColor('#A0C8DF');
                  }}
                >
                  <div className="color" style={{ background: '#A0C8DF' }}></div>
                </div>

                <div
                  className="option"
                  onClick={() => {
                    setColor('#DFB958');
                  }}
                >
                  <div className="color" style={{ background: '#DFB958' }}></div>
                </div>
              </div>
            )}
          </div>
          <SidebarFooter step={step} setStep={setStep} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
