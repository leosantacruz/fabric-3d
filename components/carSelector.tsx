import Image from 'next/image';
import { Car } from '../interfaces/general';

interface CarInterface {
  car: Car;
  active: boolean;
}

const CarSelector = ({ car, active }: CarInterface) => {
  return (
    <>
      <div className={active ? 'modelSelector active' : 'modelSelector'}>
        <div className="modelImage">
          <Image
            src={`/img/historic/${car.URL}`}
            alt={car.model.name}
            width="300"
            height="100"
            className={'historiCarImage'}
          />
        </div>
        <div className="modelName">{car.model.name}</div>
      </div>
    </>
  );
};

export default CarSelector;
