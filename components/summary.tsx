import { useCarStore } from '../store/store';
import { colorList } from '../data/colors';
const Summary = () => {
  const store = useCarStore((state: any) => state);

  return (
    <>
      <div className="summary">
        <ul>
          {store.car.model.name != 'custom' && (
            <li className="list">
              <span className="first">Livery</span>
              <span className="value">{store.car.model.name}</span>
            </li>
          )}

          <li className="list">
            <span className="first">Model</span>
            <span className="value">
              {store.car.racePack == 'Base' ? 'Testa Rossa J' : 'Pacco Gara'}
            </span>
          </li>
          <li className="list">
            <span className="first">Paintwork</span>
            <span className="value">{colorList[store.car.Paintwork.id - 1].name}</span>
          </li>

          <li className="list">
            <span className="first">Interior</span>
            <span className="value">{colorList[store.car.Interior.id - 1].name}</span>
          </li>
          <li className="list">
            <span className="first">Piping</span>
            <span className="value">{colorList[store.car.Piping.id - 1].name}</span>
          </li>

          {store.car.radiatorNumber.number && (
            <li className="list">
              <span className="first">Number</span>
              <span className="value">{store.car.radiatorNumber.number}</span>
            </li>
          )}

          {store.car.borranniUpgrade && (
            <li className="list">
              <span className="first">Borranni upgrade</span>
              <span className="value">Yes</span>
            </li>
          )}
        </ul>
        <div className="alert alert-info">
          Further personalisation options available through Bentley via{' '}
          <a href="mailto:contact@thelittlecar.co">contact@thelittlecar.co</a>
        </div>
      </div>
    </>
  );
};

export default Summary;
