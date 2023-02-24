import "./Product.css";
import classNames from "classnames/bind";
import dateFormat from "dateformat";
import hand from "../../icons/hand.svg";
import heart from "../../icons/heart.svg";
import heardRed from "../../icons/heart-red.svg";
import star from "../../icons/star.svg";
import starblack from "../../icons/star-black.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { basketAdd, getBasketSelector } from "../../redux/slices/basketSlice";
import {
  favoriteAdd,
  favoriteRemove,
  getfavoriteSelector,
} from "../../redux/slices/favoriteSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { getUserSelector } from "../../redux/slices/userSlice";
import { Loader } from "../Loader/Loader";
import { useState } from "react";
import { CreateProduct } from "../../Components/CreateProduct/CreateProduct";
import { EditProduct } from "../EditProduct/EditProduct";
import { Api } from "../../api/DogFoodApi";

export function Product() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isCreateProductModal, setIsCreateProductModal] = useState(false); //Открытие модального окна создания продукта
  const [isEditProductModal, setIsEditProductModal] = useState(false); //Открытие модального окна создания продукта
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector);
  const user = useSelector(getUserSelector);
  const { productId } = useParams();
  const arrayProducts = useSelector(getBasketSelector); //Массив продуктов в корзине
  const disableButtonBuy = arrayProducts.some((item) => item.id === productId);
  const arrayFavorite = useSelector(getfavoriteSelector); //Массив продуктов в избранном
  const statusIconFavorite = arrayFavorite.some(
    (item) => item.id === productId
  );

  //функция создания продукта
  function openModalCreateProduct() {
    setIsCreateProductModal(true);
  }
  //функция редактирования продукта
  function openModalEditProduct() {
    setIsEditProductModal(true);
  }

  //Переход в каталог
  function toCatalog() {
    navigate(`/products`);
  }
  //Добавить товар в корзину
  function addToBasket(id) {
    dispatch(basketAdd(id));
  }
  //  Добавить товар в избранное
  function addToFavorite(id) {
    dispatch(favoriteAdd(id));
  }
  //  Удалить товар из избранного
  function removeToFavorite(id) {
    dispatch(favoriteRemove(id));
  }
  
  //Получение информации о продукте
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    enabled: token !== "",
    queryKey: ["product", productId],
    queryFn: () =>
      Api.getProductsById(token,productId)
        .then((response) => response.json())
        .then((response) => {
          return response;
        }),
  });

  //Получение отзывов о товаре по id
  const reviews = useQuery({
    enabled: token !== "",
    queryKey: ["reviews", productId],
    queryFn: () => Api.getReviews(token,productId)
        .then((response) => response.json())
        .then((response) => {
          return response;
        }),
  });

  //Удаление товара по ID
  const delProduct = useMutation({
    mutationFn: () => Api.delProduct(token,productId),
    onSuccess: () => navigate(`/products`),
  });
  
  //Удаление товара
  function removeProduct(productId) {
    delProduct.mutate(productId);
  }

  //Добавление комментария
  const newReview = useMutation({
    mutationFn: (review) =>
      Api.addReview(token,review,productId),
      onSuccess:()=>reviews.refetch()
  });

  //Функция добавления комментария к продукту
  function addReview() {
    newReview.mutate({
      rating: rating,
      text: comment,
    })
    setComment('')
  }

  if (token === "")
    return (
      <div className="product-error">
        <div className="product-error__title">
          Для просмотра информации о продукте необходима авторизация!
        </div>
        <div>
          <Link to="/signin">
            <button className="product-error__button">
              Перейти на страницу авторизации
            </button>
          </Link>
        </div>
      </div>
    );

  if (isLoading) {
    return <Loader />;
  }

  // console.log(product);
  // console.log(reviews);

  const newPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );
  return (
    <div className="product" id={productId}>
      <div className="product-back">
        <button className="product-back__button" onClick={toCatalog}>
          Вернуться в каталог
        </button>
      </div>
      <div className="product-box">
        <div className="product-img">
          <img src={product.pictures} alt="productimage" />
          {product.discount > 0 && (
            <div className="product-discount">-{product.discount}%</div>
          )}
          {product.tags.includes("new") && (
            <div className="product__new">NEW</div>
          )}
          {product.tags.includes("sale") && (
            <div className="product__sale">SALE</div>
          )}
        </div>
        <div className="product-info">
          <div className="product-info__title">{product.name}</div>
          <div
            className={classNames("product-info__price", {
              "product-new": newPrice < product.price,
            })}
          >
            {newPrice.toLocaleString("ru")} ₽
            {newPrice < product.price && (
              <div className="product-info__old">
                {product.price.toLocaleString("ru")} ₽
              </div>
            )}
          </div>
          <div className="product-info__wight">{product.wight}</div>
          <div className="product-info__like">
            <img src={hand} alt="icon-hand" />
            {product.likes.length}
          </div>
          <div className="product-favorite">
            <button
              className="product-favorite__blue"
              onClick={
                statusIconFavorite
                  ? () => removeToFavorite(productId)
                  : () => addToFavorite(productId)
              }
            >
              <img
                src={statusIconFavorite ? `${heardRed}` : `${heart}`}
                alt="icon-heart"
              />
              {statusIconFavorite ? "В избранном" : " В избранное"}
            </button>
          </div>
          <div className="product-button">
            <button
              className="product-button__lime"
              onClick={() => addToBasket(productId)}
              disabled={disableButtonBuy}
            >
              {disableButtonBuy ? "В корзине" : "Купить"}
            </button>
            <button
              className="product-button__yellow"
              onClick={openModalCreateProduct}
            >
              Добавить новый
            </button>
            <CreateProduct
              isOpen={isCreateProductModal}
              setIsCreateProductModal={setIsCreateProductModal}
            />
            {user._id === product.author._id && (
              <button
                className="product-button__darkblue"
                onClick={openModalEditProduct}
              >
                Редактировать
              </button>
            )}
            <EditProduct
              isOpen={isEditProductModal}
              setIsEditProductModal={setIsEditProductModal}
              product={product}
              refetch={refetch}
            />
            {user._id === product.author._id && (
              <button
                className="product-button__red"
                onClick={() => removeProduct(productId)}
              >
                Удалить
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="comment-box">
        {product.description && (
          <>
            <div className="comment-box__title">Описание</div>
            <div className="comment-box__description">
              {product.description}
            </div>
          </>
        )}

        <div className="comment-box__title">Комментарии</div>
        <div className="comment-box__rating">
          Выберите оценку
          {[0, 1, 2, 3, 4].map((item) => (
            <button
              key={item}
              className="comment-box__rating-button"
              type="button"
              onClick={() => setRating(item + 1)}
            >
              <img
                src={item + 1 <= rating ? `${star}` : `${starblack}`}
                alt="icon-start"
              />
            </button>
          ))}
        </div>
        <div className="comment-box-add">
          <textarea
            className="comment-box-add__input"
            type="text"
            value={comment}
            placeholder="Введите текст комментария"
            onInput={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="comment-box-add__button"
            onClick={addReview}
          >
            Добавить комментарий
          </button>
        </div>

        {reviews.data !== undefined &&
          reviews.data.map((item, index) => (
            <div key={index}>
              <div className="comment-title">
                <span>{item.author.name}</span>
                <span className="comment-title__span">
                  {dateFormat(
                    item.created_at.replace("Z", "+00:00"),
                    "dd.mm.yyyy  HH:MM"
                  )}
                </span>
              </div>
              <div className="comment__text">{item.text}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
