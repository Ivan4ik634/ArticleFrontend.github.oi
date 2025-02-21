import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const handelClickLeaveAccount = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('Auth');
    navigate('/');
  };
  return (
    <>
      <p className="SettingsBykv">Налаштування</p>
      <div className="btns-leave-delete-account">
        <a className="delete item-bts-accounts">Видалити акаунт</a>
        <a onClick={() => handelClickLeaveAccount()} className="leave item-bts-accounts">
          Вийти з акаунту
        </a>
      </div>
    </>
  );
}
