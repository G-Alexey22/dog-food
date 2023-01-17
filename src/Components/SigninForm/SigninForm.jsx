import "./SigninForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SigninFormValidation } from "./SigninFormValidation";

export function SigninForm() {
  return (
    <>
      <div className="signin">
        <div className="signin-title">Форма авторизации</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SigninFormValidation}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="signin-form">
            <label className="signin-form__label" htmlFor="email">
              Электронная почта
            </label>
            <Field
              placeholder="Электронная почта"
              className="signin-form__input"
              name="email"
              type="text"
            />
            <ErrorMessage name="email" />

            <label className="signin-form__label" htmlFor="password">
              Пароль
            </label>
            <Field
              className="signin-form__input"
              name="password"
              type="password"
              placeholder="Пароль"
            />
            <ErrorMessage name="password" />

            <button className="signin-form__button" type="submit">
              Войти
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
