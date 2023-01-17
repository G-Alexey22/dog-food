import { useOutletContext } from "react-router-dom";
import { Card } from "../Card/Card";
import "./ListCard.css";



export function ListCard() {
  const[, cardsProduct, searchQuery,changeStatusFavorite] = useOutletContext()

  return (
      <div className="listcard">
        {searchQuery !== "" && cardsProduct.length === 0 && (
          <div className="query-result">
            По запросу «{searchQuery}» товаров не найдено
          </div>
        )}
        {searchQuery !== "" && cardsProduct.length > 0 && (
          <div className="query-result">
            Результаты поиска товара по запросу «{searchQuery}»
          </div>
        )}

        <div className="card-container">
          {cardsProduct.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              favorite={item.favorite}
              discount={item.discount}
              wight={item.wight}
              changeStatusFavorite={changeStatusFavorite}
            />
          ))}
        </div>
      </div>
  );
}
