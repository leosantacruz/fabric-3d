import { useState } from 'react';
import { toggleRacePack } from '@/utils/car';
import { useCarStore } from '@/store/store';

interface Props {
  changeScenario: (val: string) => void;
}
const Scenarios = (props: Props) => {
  const store = useCarStore((state: any) => state);
  const [scenario, setScenario] = useState('6d6741fbb2884bf7a582597f73739d86');
  const changeOption = (event: React.FormEvent<HTMLSelectElement>) => {
    const value: any = event.currentTarget.value;
    let updatedCar = store.car;
    updatedCar.racePack = value;
    store.updateCar(updatedCar);
    toggleRacePack(value);
  };

  const changeScenario = (val: string) => {
    props.changeScenario(val);
    setScenario(val);
  };

  return (
    <>
      <h2>El delirio</h2>
      <p>
        Blandamente mecidos sobre el ala del torbellino que es inteligente, en medio de un delirio
        paralelo
      </p>
    </>
  );
};

export default Scenarios;
