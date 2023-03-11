import "./SignupForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { SignupFormValidation } from "./SignupFormValidation";
import { useEffect, useState } from "react";
import { Api } from "../../api/DogFoodApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice.js";

export function SignupForm() {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector); //Токен из Store
  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа


  useEffect(() => {
    if (token) {
      navigate(`/user`);
    }
  }, [navigate, token]);

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      Api.signup(values).then((response) => {
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
            <ErrorMessage
              name="email"
              render={(msg) => <div className="signup-form-error">{msg}</div>}
            />
            <label className="signup-form__label" htmlFor="group">
              Группа
            </label>
            <Field
              placeholder="sm9"
              className="signup-form__input"
              name="group"
              type="text"
            />
            <ErrorMessage
              name="group"
              render={(msg) => <div className="signup-form-error">{msg}</div>}
            />
            <label className="signup-form__label" htmlFor="password">
              Пароль
            </label>
            <Field
              placeholder="Должен содержать от 4 до 8 чисел"
              className="signup-form__input"
              name="password"
              type="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="signup-form-error">{msg}</div>}
            />
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
