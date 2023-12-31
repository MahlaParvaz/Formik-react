import React from 'react';
const RadioInput = ({ label, name, formik, radioOptions }) => {
  return (
    <div className="formControl">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            id={item.value}
            value={item.value}
            name={name}
            onChange={formik.handleChange}
            checked={formik.values.gender === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default RadioInput;
