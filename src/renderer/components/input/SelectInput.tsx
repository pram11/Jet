type SelectInputProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = (props: SelectInputProps) => {
  const { label, value, options, onChange, ...rest } = props;
  return (
    <div className="select-input">
      <label>{label}</label>
      <select value={value} onChange={onChange} {...rest}>
        {options !== undefined &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectInput;
