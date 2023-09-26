const dropdown = ({
  list,
  selectedOption,
  optionChanged
}: {
  list: Array<{ value: string; name: string }>;
  selectedOption: string;
  optionChanged: (selected: string, type?: string) => void;
}) => {
  return (
    <>
      <select
        className="dropdown"
        value={selectedOption}
        name=""
        id=""
        onChange={(event) => {
          optionChanged(event.target.value);
        }}
      >
        <option value="0">Select an option</option>
        {list.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default dropdown;
