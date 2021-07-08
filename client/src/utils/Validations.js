import * as Yup from "yup";
import swal from "sweetalert";

export const LoginSchema = Yup.object({
  username: Yup.string()
    .email("Invalid email format")
    .required("This Field Is Required"),
  password: Yup.string()
    .required("This Field Is Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      "password must be 8 to 20 characters long, one uppercase, one lowercase, one number and one special case character"
    )
});

export const PasswordSchema = Yup.object({
  password: Yup.string()
    .required("Enter Your New Password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      "password must be 8 to 20 characters long, one uppercase, one lowercase, one number and one special case character"
    ),
  cnfPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  )
});

export const EmailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("This Field Is Required")
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

export const ContactSchema = Yup.object({
  name: Yup.string().required("This Field Is Required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This Field Is Required"),
  message: Yup.string().required("This Field Is Required")
});

export const NotEmpty = (input) => {
  if (input.trim().length > 0) return true;
  else {
    swal({
      title: "!! Warnign !!",
      text: `Title Cannot Be Empty`,
      icon: "info"
    });
    return false;
  }
};

export const MinLength = (text) => {
  if (text.length >= 150) return true;
  else {
    swal({
      title: "!! Warnign !!",
      text: `Atleast 150 Characters Required To Post Articles`,
      icon: "info"
    });
    return false;
  }
};
