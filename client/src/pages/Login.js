import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin } from "../store/AsyncActions/AuthActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../components/TextError";
import swal from "sweetalert";

const initialValue = {
  username: "",
  password: ""
};

const validationSchemaLogin = Yup.object({
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

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = (values, submitProps) => {
    swal({
      title: "Please Wait",
      buttons: false
    });
    dispatch(postLogin(values, history));
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div className="container">
      <div className="row mx-1 mt-md-4">
        <div className="col-md-5 login-box mx-auto">
          <div className="mt-3">
            <img src="./images/avatar.png" alt="avatar" className="avatar" />
          </div>
          <div className="login-title">Sign In</div>
          <div className="login-form">
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchemaLogin}
              onSubmit={onLogin}>
              <Form autoComplete="new-password">
                <div className="form-group">
                  <label className="form-control-label">EMAIL</label>
                  <Field
                    type="text"
                    name="username"
                    autoComplete="off"
                    className="form-control"
                  />
                  <ErrorMessage name="username" component={TextError} />
                </div>
                <div className="form-group mb-5">
                  <label className="form-control-label">PASSWORD</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <div className="mx-auto text-center mb-3">
                  <button
                    type="submit"
                    className="w-100 btn button-primary text-center">
                    LOGIN
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="text-center mb-2 form-last-text">
              <Link to="/sign-up">Forgot Password ?</Link>
            </div>
            <div className="text-center mb-2 form-last-text">
              <Link to="/sign-up">Don't Have Account ?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
