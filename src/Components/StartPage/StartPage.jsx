import "./StartPage.css";
import dog from "../../icons/dog.jpg"
import { Link } from "react-router-dom";

export function StartPage() {
  return (
    <main>
      <div className="main-picture">
        <img src={dog} alt="foto-dog" />
      </div>
      <div className="main-title">
        Большой выбор кормов для вашей собаки
        <Link to='/products'>
         <button className="main-title__button">Перейти в каталог</button>
        </Link>
      </div>
    </main>
  );
}
