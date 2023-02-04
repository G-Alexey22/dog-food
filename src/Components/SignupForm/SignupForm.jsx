import "./SignupForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";

import { SignupFormValidation } from "./SignupFormValidation";
import { useState} from "react";

export function SignupForm() {
  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      fetch("https://api.react-learning.ru/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.status === 409) {
          setStatusResponse("Пользователь с данным email уже существует.");
        }
        if (response.status === 400) {
          setStatusResponse("Некорректно заполнено одно из полей.");
        }
        if (response.status === 201) {
          setStatusResponse(
            "Новый пользователь успешно создан. Для входа на сайт перейдите на страницу авторизации."
          );
        }
      }),
  });

  //Функция отправки формы
  function SubmitSignupForm(values) {
    mutateAsync(values);
    // console.log(values)
  }

  return (
    <>
      <div className="signup">
        <div className="signup-title">Форма регистрации</div>
        <Formik
          initialValues={{
            email: "",
            group: "",
            password: "",
          }}
          validationSchema={SignupFormValidation}
          onSubmit={SubmitSignupForm}
        >
          <Form className="signup-form">
            <label className="signup-form__label" htmlFor="email">
              Электронная почта
            </label>
            <Field
              placeholder="Электронная почта"
              className="signup-form__input"
              name="email"
              type="text"
            />
            <ErrorMessage name="email" />

            <label className="signup-form__label" htmlFor="group">
              Группа
            </label>
            <Field
              placeholder="sm9"
              className="signup-form__input"
              name="group"
              type="text"
            />
            <ErrorMessage name="group" />

            <label className="signup-form__label" htmlFor="password">
              Пароль
            </label>
            <Field
              placeholder="Должен содержать от 4 до 8 чисел"
              className="signup-form__input"
              name="password"
              type="password"
            />
            <ErrorMessage name="password" />

            <div className="signup-form__message">{statusResponse}</div>

            <button className="signup-form__button" type="submit">
              Регистрация
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
