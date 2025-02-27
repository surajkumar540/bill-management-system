export const validateLogin = (values) => {
  const errors = {};
  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters!";
  }

  return errors;
};
