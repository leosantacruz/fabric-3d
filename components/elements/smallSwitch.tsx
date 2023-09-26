const customSwitch = ({
  value,
  setValue
}: {
  value: boolean;
  setValue: (val: boolean) => void;
}) => {
  return (
    <>
      <div
        className="customSwitch"
        onClick={() => {
          setValue(!value);
        }}
      >
        <div className={!value ? 'active' : ''}>No</div>
        <div className={value ? 'active' : ''}>Yes</div>
      </div>
    </>
  );
};

export default customSwitch;
