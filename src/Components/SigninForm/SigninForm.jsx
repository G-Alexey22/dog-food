import "./SigninForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SigninFormValidation } from "./SigninFormValidation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenSelector, userAdd } from "../../redux/slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { Api } from "../../api/DogFoodApi";

export function SigninForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector); //Токен из Store
  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа

  useEffect(() => {
    if (token) {
      navigate(`/user`);
    }
  }, [navigate, token]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) =>
      Api.signin(values)
        .then((response) => {
          if (response.status === 401) {
            setStatusResponse("Не правильные логин или пароль.");
          }
          if (response.status === 404) {
            setStatusResponse("Пользователь с указанным email не найден.");
          }
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((response) => {
          if (response !== undefined) {
            // console.log(response);
            dispatch(userAdd(response));
            navigate(`/user`);
          }
        }),
  });

  //Функция отправки формы
  function SubmitSigninForm(values) {
    mutateAsync(values);
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
            <ErrorMessage
              name="email"
              render={(msg) => <div className="signin-form-error">{msg}</div>}
            />
            <label className="signin-form__label" htmlFor="password">
              Пароль
            </label>
            <Field
              className="signin-form__input"
              name="password"
              type="password"
              placeholder="Пароль"
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="signin-form-error">{msg}</div>}
            />
            <div className="signin-form__message">{statusResponse}</div>
            <button
              disabled={isLoading || token}
              className="signin-form__button"
              type="submit"
            >
              Войти
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
