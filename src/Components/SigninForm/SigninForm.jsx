import "./SigninForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SigninFormValidation } from "./SigninFormValidation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export function SigninForm() {
  const setToken = useOutletContext()[0]
  const token = useOutletContext()[1];

  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) =>
      fetch("https://api.react-learning.ru/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.status === 401) {
            setStatusResponse(401);
          }
          if (response.status === 404) {
            setStatusResponse(404);
          }
          if (response.status === 200) {
            setStatusResponse(200);
            return response.json();
          }
        })
        .then((response) => {
          if (response !== undefined) {
            // console.log(response.token);
            setToken(response.token)
            localStorage.setItem("Token", JSON.stringify(response.token));
          }
        }),
  });

  //Функция отправки формы
  function SubmitSigninForm(values) {
    mutateAsync(values);
    // console.log(values)
  }

  //Удаление Токена
  function deleteToken() {
    setToken('')
    localStorage.setItem("Token", '');
  }

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
          onSubmit={SubmitSigninForm}
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

            {statusResponse === 401 && (
              <div className="signin-form__message">
                Не правильные логин или пароль.
              </div>
            )}
            {statusResponse === 404 && (
              <div className="signin-form__message">
                Пользователь с указанным email не найден.
              </div>
            )}
            {statusResponse === 200 && (
              <div className="signin-form__message">
                Вы успешно зарегистрированы.
              </div>
            )}

            <button disabled={isLoading || token} className="signin-form__button" type="submit">
              Войти
            </button>
            <button disabled={isLoading || !token} className="signin-form__button"  
            onClick={deleteToken}>
              Выйти
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
