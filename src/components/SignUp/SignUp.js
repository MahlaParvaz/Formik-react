import { useFormik } from 'formik';
// import { useState } from 'react';
import * as Yup from 'yup';
import Input from '../common/Input';
import RadioInput from '../common/RadioInput';
import SelectComponent from '../common/SelectComponent';
const radioOptions = [
  { label: 'male', value: '0' },
  { label: 'female', value: '1' },
];

const selectOptions = [
  { label: 'select nationality ...', value: '' },
  { label: 'Iran', value: 'IR' },
  { label: 'Germany', value: 'GER' },
  { label: 'USA', value: 'US' },
];
const initialValues = {
  name: '',
  email: '',
  password: '',
  gender: '',
  nationality: '',
};
const onSubmit = (values) => {
  console.log(values);
};
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is Required';
  }
  if (!values.email) {
    errors.email = 'Email is Required';
  }
  if (!values.password) {
    errors.password = 'Password is Required';
  }
  return errors;
};
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name length is not valid'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]{11}$/, 'Invalid Phone Number')
    .nullable(),
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  passwordConfirm: Yup.string()
    .required('Password Coonfirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  gender: Yup.string().required('Gender is required'),
  nationality: Yup.string().required('Select Nationality'),
});
const SignUp = () => {
  // const [formValues, setFormValues] = useState('');
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validate,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  // console.log(formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />

        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="password Confirmation"
          type="password"
        />
        <RadioInput
          formik={formik}
          name="gender"
          radioOptions={radioOptions}
          label="gender"
        />
        <SelectComponent
          formik={formik}
          selectOptions={selectOptions}
          name="nationality"
        />
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
