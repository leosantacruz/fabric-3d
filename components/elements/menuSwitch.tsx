interface Props {
  options: string[];
  selectOption: (selected: string) => void;
  selectedOption: string;
}

const customSelector = ({ options, selectOption, selectedOption }: Props) => {
  return (
    <>
      <div className="customSelector">
        {options.map((item, index) => {
          return (
            <div
              className={selectedOption === item ? 'active' : ''}
              onClick={() => {
                selectOption(item);
              }}
              key={index}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default customSelector;
