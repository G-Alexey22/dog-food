import "./UserDetail.css";
import { useDispatch, useSelector } from "react-redux";
import {getTokenSelector,
  getUserSelector,
  userRemove,
} from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function UserDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector);
  const user = useSelector(getUserSelector);

  useEffect(()=>{
    if (!token) {
        navigate(`/signin`)
      }
    },[navigate, token])

  //Удаление User
  function deleteUser() {
    dispatch(userRemove());
  }

  return (
    <div className="userdetail">
      <div className="userdetail-wpapper">
        <div className="userdetail-avatar">
          <img src={user.avatar} alt="avatar" />
        </div>
        <div>
          <div className="userdetail-title">ФИО</div>
          <div className="userdetail-text">{user.name}</div>
          <div className="userdetail-title">Описание</div>
          <div className="userdetail-text">{user.about}</div>
          <div className="userdetail-title">Электронная почта</div>
          <div className="userdetail-text">{user.email}</div>
          <div className="userdetail-title">Группа</div>
          <div className="userdetail-text">{user.group}</div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="userdetail__button"
          onClick={() => {
            deleteUser();
            navigate(`/signin`);
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
