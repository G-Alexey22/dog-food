import "./Footer.css";
import visa from "../../icons/visa.svg";
import mastercard from "../../icons/mastercard.svg";
import mir from "../../icons/mir.svg";
import telegramm from "../../icons/telegramm.svg";
import whatsapp from "../../icons/whatsapp.svg";
import vk from "../../icons/vk.svg";
import instagram from "../../icons/instagram.svg";
import viber from "../../icons/viber.svg";

export function Footer() {
  // console.log('Footer')
  return (
    <footer>
      <div className="footer-container">
        Интернет-магазин "Dog food"
        <div className="footer-container-label">
          <img src={visa} alt="icon-visa" />
          <img src={mastercard} alt="icon-mastercard" />
          <img src={mir} alt="icon-mir" />
        </div>
      </div>
      <div className="footer-container">
        8(800)-974-00-00 <br></br>
      <small>dog-food@gmail.com</small>  
        <div className="footer-container-label">
          <img src={telegramm} alt="icon-telegramm" />
          <img src={whatsapp} alt="icon-whatsapp" />
          <img src={viber} alt="icon-viber" />
          <img src={instagram} alt="icon-instagram" />
          <img src={vk} alt="icon-vk" />
        </div>
      </div>

      <div className="footer-container">
        <br />
        Контакты <br />
        <address>
          <br />
          г.Люберцы
          <br />
          пр-кт Космонавтов д.148
          <br />
          Пн-Пт: 9:00-20:00 <br />
          Сб-Вс: 10:00-18:00
          <br />
          <br />
        </address>
      </div>
    </footer>
  );
}
