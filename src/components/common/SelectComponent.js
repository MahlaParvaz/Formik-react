const SelectComponent = ({ formik, name, selectOptions }) => {
  return (
    <div className="formControl">
      <select {...formik.getFieldProps(name)} name={name}>
        {selectOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.error[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
