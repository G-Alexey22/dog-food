import * as Yup from "yup";

export const editProductFormValidation = Yup.object({
  name: Yup.string()
    .min(4, "Поле должно содержать не менее 4 символов")
    .max(70, "Поле должно содержать не более 70 символов")
    .required("Обязательно для заполнения"),
  price: Yup.number()
    .min(1, "Цена не может меньше 1")
    .required("Обязательно для заполнения"),
  discount: Yup.number()
    .min(0, "Скидка не может быть меньше 0")
    .max(100, "Скидка не может быть больше 100"),
  stock: Yup.number().min(1, "Запас не может меньше 1"),
  wight: Yup.string()
    .min(1, "Поле должно содержать не менее 1 символа")
    .max(20, "Поле должно содержать не более 20 символов"),
  pictures: Yup.string().url("Не правильный URL"),
  description: Yup.string()
    .min(4, "Поле должно содержать не менее 4 символов")
    .max(500, "Поле должно содержать не более 500 символов")
    .required("Обязательно для заполнения"),
});


