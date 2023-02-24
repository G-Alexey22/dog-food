import "./CreateProduct.css";
import { Modal } from "../../Components/Modal/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProductFormValidation } from "./createProductFormValidation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import{Api} from "../../api/DogFoodApi"

export function CreateProduct({ isOpen, setIsCreateProductModal }) {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const [url, setUrl] = useState(); //Ссылrа из URL формы
  const [statusResponse, setStatusResponse] = useState(""); //Статус ответа
  const [newID, setNewID] = useState(); //ID нового товара
  const [form, setForm] = useState(true); //Отслеживание изменений в форме

  //Функция отслеживания изменений в форме
  function chahgeForm(e) {
    if (e.target) {
      setForm(false);
      setStatusResponse("");
    }
  }

  const { mutate } = useMutation({
    mutationFn: (values) => Api.сreateProduct(token,values)
    .then((response) => {
          if (response.status === 400) {
            setStatusResponse("Неверный запрос");
          }
          if (response.status === 201) {
            setStatusResponse("Новый товар успешно добавлен.");
            return response.json();
          }
        })
        .then((response) => {
          setNewID(response?._id);
        }),
  });

  //Функция отправки формы
  function createProductForm(values) {
    mutate(values);
    setForm(true);
  }

  //Кнопка "Перейти к новому продукту"
  function toNewProduct(newID) {
    setIsCreateProductModal(false);
    navigate(`/products/${newID}`);
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <div className="createProduct">
          <div className="createProduct__image">
            <img
              src={url || "https://серебро.рф/img/placeholder.png"}
              alt="photoproduct"
            />
          </div>

          <Formik
            initialValues={{
              available: true, // boolean
              pictures: "", // string,
              name: "", // string, обязательное
              price: 1, // number, обязательное
              discount: 0, // number
              stock: 10, // number
              wight: "10 шт.", // string
              description: "", // string, обязательное
            }}
            validationSchema={createProductFormValidation}
            onSubmit={createProductForm}
          >
            <Form className="createProduct-form" onChange={chahgeForm}>
              <label className="createProduct__label required" htmlFor="name">
                Название продукта
              </label>
              <Field
                placeholder="Название продукта"
                className="createProduct__input"
                name="name"
                type="text"
              />
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <div className="createProduct-error">{msg}</div>
                )}
              />

              <div className="wrapper">
                <div className="createProduct-box">
                  <label
                    className="createProduct__label required"
                    htmlFor="price"
                  >
                    Цена
                  </label>
                  <Field
                    placeholder="Цена"
                    className="createProduct__input"
                    name="price"
                    type="text"
                  />
                  <ErrorMessage
                    name="price"
                    render={(msg) => (
                      <div className="createProduct-error">{msg}</div>
                    )}
                  />
                  <label className="createProduct__label" htmlFor="discount">
                    Скидка
                  </label>
                  <Field
                    placeholder="Скидка"
                    className="createProduct__input"
                    name="discount"
                    type="text"
                  />
                  <ErrorMessage
                    name="discount"
                    render={(msg) => (
                      <div className="createProduct-error">{msg}</div>
                    )}
                  />
                </div>
                <div className="createProduct-box">
                  <label className="createProduct__label" htmlFor="stock">
                    Запас товара
                  </label>
                  <Field
                    placeholder="Запас товара"
                    className="createProduct__input"
                    name="stock"
                    type="text"
                  />
                  <ErrorMessage
                    name="stock"
                    render={(msg) => (
                      <div className="createProduct-error">{msg}</div>
                    )}
                  />

                  <label className="createProduct__label" htmlFor="wight">
                    Объем товара
                  </label>
                  <Field
                    placeholder="Объем товара"
                    className="createProduct__input"
                    name="wight"
                    type="text"
                  />
                  <ErrorMessage
                    name="wight"
                    render={(msg) => (
                      <div className="createProduct-error">{msg}</div>
                    )}
                  />
                </div>
              </div>

              <label className="createProduct__label" htmlFor="pictures">
                Ссылка на изображение
              </label>
              <Field
                placeholder="Ссылка на изображение"
                className="createProduct__input"
                name="pictures"
                type="text"
                onInput={(e) => setUrl(e.target.value)}
              />
              <ErrorMessage
                name="pictures"
                render={(msg) => (
                  <div className="createProduct-error">{msg}</div>
                )}
              />

              <label
                className="createProduct__label required"
                htmlFor="description"
              >
                Описание товара
              </label>
              <Field
                placeholder="Описание товара"
                className="createProduct__textarea"
                name="description"
                as="textarea"
              />

              <ErrorMessage
                name="description"
                render={(msg) => (
                  <div className="createProduct-error">{msg}</div>
                )}
              />

              <div className="createProduct__message">{statusResponse}</div>
              <div className="createProduct-button">
                <button
                  className="createProduct-button-red"
                  type="button"
                  onClick={() => {
                    setStatusResponse("");
                    setIsCreateProductModal(false);
                  }}
                >
                  Закрыть
                </button>
                <button
                  className="createProduct-button-lime"
                  type="submit"
                  disabled={form}
                >
                  Сохранить
                </button>
              </div>
              {newID && (
                <button
                  className="createProduct-button-blue"
                  type="button"
                  onClick={() => toNewProduct(newID)}
                >
                  Перейти на страницу нового продукта
                </button>
              )}
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
}
