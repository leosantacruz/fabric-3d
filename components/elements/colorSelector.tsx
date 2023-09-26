import { Color } from 'interfaces/general';
import { useCarStore } from '@/store/store';

interface Props {
  options: Array<Color>;
  selectOption: (selected: Color) => void;
  selectedOption: Color;
  category: string;
}

const ColorSelector = ({ options, selectOption, selectedOption, category }: Props) => {
  const store = useCarStore((state: any) => state);

  return (
    <>
      <div className="colorSelector">
        {options.map((item, index) => {
          return (
            <div
              className={item.id === store.car[category].id ? 'active option' : 'option'}
              onClick={() => {
                selectOption(item);
              }}
              key={index}
            >
              <div
                className="color"
                style={{
                  backgroundColor: `rgb(${item.r},${item.g},${item.b})`
                }}
              ></div>
              {category != 'Piping' && <div className="name"> {item.name} </div>}
              {category == 'Piping' && (
                <div className="name"> {index == 0 ? 'Tone on Tone' : item.name} </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ColorSelector;
