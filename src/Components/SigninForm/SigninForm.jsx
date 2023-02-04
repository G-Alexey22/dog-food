import "./SigninForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SigninFormValidation } from "./SigninFormValidation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenSelector, userAdd ,userRemove} from "../../redux/slices/userSlice.js";

export function SigninForm() {
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector);  //Токен из Store
 

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
            setStatusResponse("Не правильные логин или пароль.");
          }
          if (response.status === 404) {
            setStatusResponse("Пользователь с указанным email не найден.");
          }
          if (response.status === 200) {
            setStatusResponse("Вы успешно авторизованы.");
            return response.json();
          }
        })
        .then((response) => {
          if (response !== undefined) {
            // console.log(response);
            dispatch(userAdd(response));
          }
        }),
  });

  //Функция отправки формы
  function SubmitSigninForm(values) {
    mutateAsync(values);
    // console.log(values)
  }

  //Удаление User
  function deleteUser() {
    dispatch(userRemove())
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

            <div className="signin-form__message">{statusResponse}</div>

            <button
              disabled={isLoading || token}
              className="signin-form__button"
              type="submit"
            >
              Войти
            </button>
            <button
              disabled={isLoading || !token}
              className="signin-form__button"
              onClick={()=>{
                deleteUser()
                setStatusResponse("Вы успешно вышли из учётной записи.")
              }}
            >
              Выйти
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
