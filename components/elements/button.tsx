type Props = {
  children: JSX.Element;
};

const button = ({ children }: Props) => {
  return (
    <>
      <div className="btn white">{children}</div>
    </>
  );
};

export default button;
