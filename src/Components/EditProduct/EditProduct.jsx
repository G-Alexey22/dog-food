import "./EditProduct.css";
import { Modal } from "../../Components/Modal/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editProductFormValidation } from "./editProductFormValidation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { Api } from "../../api/DogFoodApi";

export function EditProduct({
  isOpen,
  setIsEditProductModal,
  product,
  refetch,
}) {
  const token = useSelector(getTokenSelector);
  const [url, setUrl] = useState(); //Ссылrа из URL формы
  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа
  const [form, setForm] = useState(true); //Отслеживание изменений в форме

  //Функция отслеживания изменений в форме
  function chahgeForm(e) {
    if (e.target) {
      setForm(false);
      setStatusResponse("");
    }
  }

  const { mutate } = useMutation({
    mutationFn: (values) =>
      Api.editProduct(token, values, product._id)
      .then((response) => {
        if (response.status === 400) {
          setStatusResponse("Неверный запрос");
        }
        if (response.status === 200) {
          setStatusResponse("Изменения успешно сохранены.");
          return response.json();
        }
      }),
  });

  //Функция отправки формы
  function editProductForm(values) {
    mutate(values);
    setForm(true);
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <div className="createProduct">
          <div className="createProduct__image">
            <img src={url || product.pictures} alt="photoproduct" />
          </div>

          <Formik
            initialValues={{
              available: true, // boolean
              pictures: product.pictures, // string,
              name: product.name, // string, обязательное
              price: product.price, // number, обязательное
              discount: product.discount, // number
              stock: product.stock, // number
              wight: product.wight, // string
              description: product.description, // string, обязательное
            }}
            validationSchema={editProductFormValidation}
            onSubmit={editProductForm}
          >
            <Form className="editProduct-form" onChange={chahgeForm}>
              <label className="editProduct__label required" htmlFor="name">
                Название продукта
              </label>
              <Field
                placeholder="Название продукта"
                className="editProduct__input"
                name="name"
                type="text"
              />
              <ErrorMessage
                name="name"
                render={(msg) => <div className="editProduct-error">{msg}</div>}
              />

              <div className="wrapper">
                <div className="editProduct-box">
                  <label
                    className="editProduct__label required"
                    htmlFor="price"
                  >
                    Цена
                  </label>
                  <Field
                    placeholder="Цена"
                    className="editProduct__input"
                    name="price"
                    type="text"
                  />
                  <ErrorMessage
                    name="price"
                    render={(msg) => (
                      <div className="editProduct-error">{msg}</div>
                    )}
                  />
                  <label className="editProduct__label" htmlFor="discount">
                    Скидка
                  </label>
                  <Field
                    placeholder="Скидка"
                    className="editProduct__input"
                    name="discount"
                    type="text"
                  />
                  <ErrorMessage
                    name="discount"
                    render={(msg) => (
                      <div className="editProduct-error">{msg}</div>
                    )}
                  />
                </div>
                <div className="editProduct-box">
                  <label className="editProduct__label" htmlFor="stock">
                    Запас товара
                  </label>
                  <Field
                    placeholder="Запас товара"
                    className="editProduct__input"
                    name="stock"
                    type="text"
                  />
                  <ErrorMessage
                    name="stock"
                    render={(msg) => (
                      <div className="editProduct-error">{msg}</div>
                    )}
                  />

                  <label className="editProduct__label" htmlFor="wight">
                    Объем товара
                  </label>
                  <Field
                    placeholder="Объем товара"
                    className="editProduct__input"
                    name="wight"
                    type="text"
                  />
                  <ErrorMessage
                    name="wight"
                    render={(msg) => (
                      <div className="editProduct-error">{msg}</div>
                    )}
                  />
                </div>
              </div>

              <label className="editProduct__label" htmlFor="pictures">
                Ссылка на изображение
              </label>
              <Field
                placeholder="Ссылка на изображение"
                className="editProduct__input"
                name="pictures"
                type="text"
                onInput={(e) => setUrl(e.target.value)}
              />
              <ErrorMessage
                name="pictures"
                render={(msg) => <div className="editProduct-error">{msg}</div>}
              />

              <label
                className="editProduct__label required"
                htmlFor="description"
              >
                Описание товара
              </label>
              <Field
                placeholder="Описание товара"
                className="editProduct__textarea"
                name="description"
                as="textarea"
              />

              <ErrorMessage
                name="description"
                render={(msg) => <div className="editProduct-error">{msg}</div>}
              />

              <div className="editProduct__message">{statusResponse}</div>
              <div className="editProduct-button">
                <button
                  className="editProduct-button-red"
                  type="button"
                  onClick={() => {
                    setStatusResponse("");
                    refetch();
                    setIsEditProductModal(false);
                  }}
                >
                  Закрыть
                </button>
                <button
                  className="editProduct-button-lime"
                  type="submit"
                  disabled={form}
                >
                  Сохранить
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
}
