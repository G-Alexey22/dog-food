import * as Yup from "yup";

export const SigninFormValidation = Yup.object({
  email: Yup.string()
    .email("Неверный адрес электронной почты")
    .required("Обязательно для заполнения"),
   password: Yup.string().required("Обязательно для заполнения"),
   
});