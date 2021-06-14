import * as Yup from "yup";
import swal from "sweetalert";

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
