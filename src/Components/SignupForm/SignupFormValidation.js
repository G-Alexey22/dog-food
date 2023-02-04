import * as Yup from "yup";

export const SignupFormValidation = Yup.object({
  email: Yup.string()
    .email("Неверный адрес электронной почты")
    .required("Обязательно для заполнения"),
  group: Yup.string()
    .max(3, "Максимальная длина 3 символа")
    .required("Обязательно для заполнения"),
  password: Yup.string().required("Обязательно для заполнения")
    .min(4, "Пароль должен содержать не меннее 4 символов")
    .max(8, "Пароль должен содержать не более 8 символов")
    .matches(/[0-9]/, "Пароль должен содержать только цифры."),
});
