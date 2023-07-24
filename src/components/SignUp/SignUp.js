import { useFormik } from 'formik';
import * as Yup from 'yup';
const initialValues = {
  name: '',
  email: '',
  password: '',
  gender: '',
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
});
const SignUp = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    validationSchema,
    validateOnMount: true,
  });
  // console.log(formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input type="text" {...formik.getFieldProps('name')} name="name" />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="text" {...formik.getFieldProps('email')} name="email" />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            {...formik.getFieldProps('password')}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            {...formik.getFieldProps('passwordConfirm')}
            name="password"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="error">{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <div className="formControl">
          <input
            type="radio"
            id="0"
            value="0"
            name="gender"
            onChange={formik.handleChange}
            checked={formik.values.gender === '0'}
          />
          <label htmlFor="0">Male</label>
          <input
            type="radio"
            id="1"
            value="1"
            name="gender"
            onChange={formik.handleChange}
            checked={formik.values.gender === '1'}
          />
          <label htmlFor="1">Female</label>
        </div>
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
