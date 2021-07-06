import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import { SendEmail } from "../utils/SendEmail";
import { SweetContact, SweetWait, SweetWrong } from "../utils/SweetAlert";
import { ContactTemplate } from "../utils/Templates";
import { ContactSchema } from "../utils/Validations";

const initialValue = {
  name: "",
  email: "",
  message: ""
};

const Contact = () => {
  const onSend = async (values, submitProps) => {
    SweetWait();
    try {
      const isSent = await SendEmail(ContactTemplate(values));

      if (isSent.status === 200) {
        SweetContact();
        submitProps.setSubmitting(false);
        submitProps.resetForm();
      }
    } catch (error) {
      SweetWrong();
    }
  };

  return (
    <div className="container">
      <div className="row mx-1">
        <div className="col-md-5 login-box mx-auto">
          <div className="mt-3">
            <img src="./images/avatar.png" alt="avatar" className="avatar" />
          </div>
          <div className="login-title">Contcat Us</div>
          <div className="login-form">
            <Formik
              initialValues={initialValue}
              validationSchema={ContactSchema}
              onSubmit={onSend}>
              <Form autoComplete="new-password">
                <div className="form-group">
                  <label className="form-control-label">NAME</label>
                  <Field
                    autoComplete="new-password"
                    type="text"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">EMAIL</label>
                  <Field
                    autoComplete="new-password"
                    type="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">MESSAGE</label>
                  <Field
                    autoComplete="none"
                    as="textarea"
                    className="form-control"
                    name="message"
                  />
                  <ErrorMessage name="message" component={TextError} />
                </div>
                <div className="mx-auto text-center mb-4">
                  <button
                    type="submit"
                    className="w-100 btn button-primary text-center">
                    Send Query
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
