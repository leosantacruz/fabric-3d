import { useCarStore } from '@/store/store';

import { toggleBorranni, toggleNumber } from '@/utils/car';
import PrintNumber from '@/utils/number';
import { colorList } from '@/data/colors';
import { addTexture, setTexture } from '@/utils/sketchfab';

import Switch from '../elements/smallSwitch';
import Summary from '../summary';

const CustomOptions = () => {
  const store = useCarStore((state: any) => state);
  const changeRadiatorNumber = async (event: React.FormEvent<HTMLInputElement>) => {
    const val: any = event.currentTarget.value;
    if (val >= 0 && val <= 99 && val.length < 3) {
      store.updateCar({ ...store.car, raceNumber: { ...store.car.radiatorNumber, number: val } });
      applyTexture(val);
    }
  };

  const changeRoundelNumber = async (event: React.FormEvent<HTMLInputElement>) => {
    const val: any = event.currentTarget.value;
    if (val >= 0 && val <= 99 && val.length < 3) {
      store.updateCar({ ...store.car, raceNumber: { ...store.car.radiatorNumber, number: val } });
      applyTexture(val);
    }
  };

  const applyTexture = async (newValue: number | '') => {
    const image = PrintNumber({
      type: 'mask',
      color: colorList[store.car.radiatorNumber.numberColor.id - 1],
      val: newValue,
      background:
        store.car.radiatorNumber.type == 'circle'
          ? { r: 255, g: 255, b: 255 }
          : colorList[store.car.Paintwork.id - 1],
      typography: store.car.radiatorNumber.typography,
      fontSize: store.car.radiatorNumber.fontSize
    });
    const textureUid = await addTexture(image);
    setTexture('Number_A', textureUid);
  };

  const changeVisibility = (type: string, val: boolean) => {
    toggleNumber(store.car.radiatorNumber.parts, val); //show hide number area

    store.updateCar({
      ...store.car,
      [type]: { ...store.car[type], show: val, number: '' }
    });
    applyTexture('');
  };

  const changeWheels = (val: boolean) => {
    store.updateCar({ ...store.car, borranniUpgrade: val });
    toggleBorranni(val);
  };

  return (
    <>
      <h2>Personalize</h2>

      {store.car.radiatorNumber.parts.length > 0 && (
        <div className="optionRow">
          <div>Radiator Number</div>
          <div>
            <Switch
              value={store.car.radiatorNumber.show}
              setValue={(val: boolean) => {
                changeVisibility('radiatorNumber', val);
              }}
            />
          </div>
          {store.car.radiatorNumber.show && (
            <input
              placeholder="Number"
              type="number"
              min="0"
              max="99"
              onInput={changeRadiatorNumber}
              id="numberValue"
              value={store.car.radiatorNumber.number}
            />
          )}
        </div>
      )}

      {store.car.roundelNumber.parts.length > 0 && (
        <div className="optionRow">
          <div>Roundel Number</div>
          <div>
            <Switch
              value={store.car.roundelNumber.show}
              setValue={(val: boolean) => {
                changeVisibility('roundelNumber', val);
              }}
            />
          </div>
          {store.car.roundelNumber.show && (
            <input
              placeholder="Number"
              type="number"
              min="0"
              max="99"
              onInput={changeRoundelNumber}
              id="numberValue"
              value={store.car.roundelNumber.number}
            />
          )}
        </div>
      )}

      {store.car.radiatorNumber.parts.length > 0 && (
        <div className="optionRow">
          <div>
            <img src="images/british-flag.jpg" alt="" />
          </div>
          <div>
            <Switch
              value={store.car.flag.show}
              setValue={(val: boolean) => {
                changeVisibility('flag', val);
              }}
            />
          </div>
        </div>
      )}

      {/* <h4 className="summaryTitle">Summary</h4> */}

      {/* <Summary /> */}
    </>
  );
};

export default CustomOptions;
