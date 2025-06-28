import "./Label.scss";

const Label = ({ children, label }) => {
  return (
    <label>
      <span className="name">{label}</span>
      {children}
    </label>
  );
};

export default Label;
