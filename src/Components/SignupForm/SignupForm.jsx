import "./SignupForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";

import { SignupFormValidation } from "./SignupFormValidation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const navigate = useNavigate()
  const [counter, setCounter] = useState(); //Статус таймера
  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

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
          setStatusResponse(409);
        }
        if (response.status === 400) {
          setStatusResponse(400);
        }
        if (response.status === 201) {
          setStatusResponse(201);
          setCounter(15);
          setTimeout(()=>{navigate('/signin')},15000 )
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
            {statusResponse === 409 && (
              <div className="signup-form__message">
                Пользователь с данным email уже существует.
              </div>
            )}
            {statusResponse === 400 && (
              <div className="signup-form__message">
                Некорректно заполнено одно из полей.
              </div>
            )}
            {statusResponse === 201 && (
              <div className="signup-form__message">
                Новый пользователь успешно создан. Вы будете
                перенаправлены на страницу авторизации через {counter} сек.
              </div>
            )}

            <button className="signup-form__button" type="submit">
              Регистрация
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
