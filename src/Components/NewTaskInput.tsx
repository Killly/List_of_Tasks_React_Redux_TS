import React, { useState, useEffect } from "react";

interface NewTaskInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  validate: (value: string) => boolean;
}

const NewTaskInput: React.FC<NewTaskInputProps> = ({
  label,
  value,
  onChange,
  validate,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Validate the input value
    if (validate(newValue)) {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <>
      <label>{label}</label>
      <input
        onChange={updateValue}
        value={localValue}
        type="text"
        placeholder={label}
        className="form-control"
      />
    </>
  );
};

export default NewTaskInput;
