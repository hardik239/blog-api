import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin } from "../store/AsyncActions/AuthActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../utils/Validations";
import TextError from "../components/TextError";
import { SweetWait } from "../utils/SweetAlert";
import { FaUser } from "react-icons/fa";

const initialValue = {
  username: "",
  password: ""
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = (values, submitProps) => {
    SweetWait();
    dispatch(postLogin(values, history, submitProps));
  };

  return (
    <div className="container mb-5">
      <div className="row mx-1 mt-md-4">
        <div className="col-md-5 login-box mx-auto">
          <div className="mt-3">
            <FaUser size={100} color="orange" />
          </div>
          <div className="login-title">Sign In</div>
          <div className="login-form">
            <Formik
              initialValues={initialValue}
              validationSchema={LoginSchema}
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
              <Link to="/forgot-password">Forgot Password ?</Link>
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
