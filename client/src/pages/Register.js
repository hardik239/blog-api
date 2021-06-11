import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../components/TextError";
import { SendEmail } from "../utils/SendEmail";
import { VerifyOtpTemplate } from "../utils/Templates";
import {
  SweetInfo,
  SweetOtpConfig,
  SweetOtpWrong,
  SweetSuccess,
  SweetWait,
  SweetWrong
} from "../utils/index";
import axios from "axios";
import swal from "sweetalert";

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) OTP += digits[Math.floor(Math.random() * 10)];
  return OTP;
}

const initialValue = {
  name: "",
  email: "",
  password: ""
};

const validationSchema = Yup.object({
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

const Register = () => {
  const [otpStatusText, setOtpStatusText] = useState("Send Otp");

  const history = useHistory();

  const [otp, setOtp] = useState(generateOTP());

  const onRegister = async (values, submitProps) => {
    SweetWait();

    const res = await axios.post("http://localhost:5000/user/userexist", {
      email: values.email
    });

    const { info, error } = res.data;

    if (info) {
      SweetInfo(info);
      history.push("/sign-in");
    } else if (error) SweetWrong();
    else {
      const sendEmail = {
        otp,
        username: values.name,
        email: values.email
      };
      try {
        const isSent = await SendEmail(VerifyOtpTemplate(sendEmail));

        if (isSent.status === 200) {
          const userOtp = await swal(SweetOtpConfig);
          if (otp === userOtp) {
            swal.stopLoading();
            swal.close();

            const { name, email, password } = values;

            const res = await axios.post(
              "http://localhost:5000/user/register",
              { name, email, password },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            );
            const { msgBody, msgError } = res.data.message;

            if (!msgError) {
              SweetSuccess(msgBody);
              history.push("/sign-in");
            } else SweetWrong(msgBody);
          } else SweetOtpWrong();
          setOtpStatusText("Resend Otp");
        }
      } catch (error) {
        SweetWrong();
        setOtp(generateOTP());
      }
    }
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div className="container mb-5">
      <div className="row mx-1 mt-md-4">
        <div className="col-md-5 login-box mx-auto">
          <div className="mt-3">
            <img src="./images/avatar.png" alt="avatar" className="avatar" />
          </div>
          <div className="login-title">Sign Up</div>
          <div className="login-form">
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={onRegister}>
              <Form autoComplete="new-password">
                <div className="form-group">
                  <label className="form-control-label">USERNAME</label>
                  <Field
                    autoComplete="off"
                    type="text"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">EMAIL</label>
                  <Field
                    autoComplete="off"
                    type="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <div className="mx-auto text-center mb-2">
                  <button
                    type="submit"
                    className="w-100 btn button-primary text-center">
                    {otpStatusText}
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="text-center mb-2 form-last-text">
              <Link to="/sign-in">Already Account ?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
