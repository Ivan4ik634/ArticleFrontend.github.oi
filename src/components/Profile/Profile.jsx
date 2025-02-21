import { useEffect, useState } from 'react';
import User from '../../img/Male User.png';
import axios from '../axios';
import '../../css/Profile/Profile.css';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const [InfoMe, setInfoMe] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/auth/me')
      .then((res) => setInfoMe(res.data))
      .catch((err) => navigate('/'));
  }, []);
  return (
    <>
      <p className="profile-bykv">Профіль</p>
      <div className="Profile">
        <img src={User} alt="" />
        <div className="MyInfo">
          <p>Ім'я:{InfoMe.fullName}</p>
          <p>Емайл:{InfoMe.email}</p>
          <p>Пароль:********</p>
        </div>
      </div>
    </>
  );
}
