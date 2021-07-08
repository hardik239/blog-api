import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmailSchema, PasswordSchema } from "../utils/Validations";
import TextError from "../components/TextError";
import { SendEmail } from "../utils/SendEmail";
import { ResetPasswordTemplate } from "../utils/Templates";
import { FaUser } from "react-icons/fa";
import {
  SweetInfo,
  SweetOtpConfig,
  SweetOtpWrong,
  SweetWait,
  SweetWrong
} from "../utils/SweetAlert";
import axios from "axios";
import swal from "sweetalert";

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) OTP += digits[Math.floor(Math.random() * 10)];
  return OTP;
}

const initialValue = {
  email: "",
  password: "",
  cnfPassword: ""
};

const ForgotPassword = () => {
  const history = useHistory();

  const [otp, setOtp] = useState(generateOTP());

  const [next, setIsNext] = useState(false);

  const onSubmit = async (values) => {
    SweetWait();
    const res = await axios.post("http://localhost:5000/user/forgot-password", {
      email: values.email,
      password: values.password
    });

    const { success } = res.data;

    console.log(res.data);

    if (success) {
      swal({
        title: "Good Job!!",
        text: success,
        icon: "success"
      });
      history.push("/sign-in");
    } else SweetWrong();
  };

  const onNextClick = async (values) => {
    SweetWait();
    const res = await axios.post("http://localhost:5000/user/userexist", {
      email: values.email
    });

    const { success, error } = res.data;

    if (success) {
      SweetInfo(success);
      history.push("/sign-in");
    } else if (error) SweetWrong();
    else {
      const sendEmail = {
        otp,
        email: values.email
      };
      try {
        const isSent = await SendEmail(ResetPasswordTemplate(sendEmail));

        if (isSent.status === 200) {
          const userOtp = await swal(SweetOtpConfig);
          if (otp === userOtp) {
            swal.stopLoading();
            swal.close();
            setIsNext(!next);
          } else SweetOtpWrong();
        }
      } catch (error) {
        SweetWrong();
        setOtp(generateOTP());
      }
    }
  };

  return (
    <div className="container mt-md-5 pt-md-5 mb-5">
      <div className="row mx-1 mt-md-4">
        <div className="col-md-5 login-box mx-auto">
          <div className="mt-3">
            <FaUser size={100} color="orange" />
          </div>
          <div className="login-title">Forgot Password</div>
          <div className="login-form">
            {!next ? (
              <>
                <Formik
                  initialValues={initialValue}
                  validationSchema={EmailSchema}
                  onSubmit={onNextClick}>
                  <Form autoComplete="new-password">
                    <div className="form-group">
                      <label className="form-control-label">EMAIL</label>
                      <Field
                        type="text"
                        name="email"
                        autoComplete="off"
                        className="form-control"
                      />
                      <ErrorMessage name="email" component={TextError} />
                    </div>
                    <div className="mx-auto text-center mb-3">
                      <button
                        type="submit"
                        className="w-100 btn button-primary text-center">
                        Send Otp
                      </button>
                    </div>
                  </Form>
                </Formik>
              </>
            ) : (
              <>
                <Formik
                  initialValues={initialValue}
                  validationSchema={PasswordSchema}
                  onSubmit={onSubmit}>
                  <Form autoComplete="new-password">
                    <div className="form-group">
                      <label className="form-control-label">NEW PASSWORD</label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <ErrorMessage name="password" component={TextError} />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">
                        CONFIRM PASSWORD
                      </label>
                      <Field
                        type="password"
                        name="cnfPassword"
                        className="form-control"
                      />
                      <ErrorMessage name="cnfPassword" component={TextError} />
                    </div>
                    <div className="mx-auto text-center mb-3">
                      <button
                        type="submit"
                        className="w-100 btn button-primary text-center">
                        Forgot Password
                      </button>
                    </div>
                  </Form>
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
