import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string()
    .email("Invalid email format")
    .required("This Field Is Required"),
  password: Yup.string()
    .required("This Field Is Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "password must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    )
});

export const RegisterSchema = Yup.object({
  name: Yup.string().required("This Field Is Required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This Field Is Required"),
  password: Yup.string()
    .required("This Field Is Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
});
