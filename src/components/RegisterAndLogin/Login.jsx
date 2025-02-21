import User from '../../img/Male User.png';
import '../../css/RegisterAndLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  if (window.localStorage.getItem('token')) {
    navigate('/');
  }
  const PostLogin = () => {
    axios
      .post('/auth/login', {
        email,
        password,
      })
      .then((res) => {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('Auth', true);
        navigate('/');
      })
      .catch((error) => {
        setErrors(error.response.data.message);
      });
  };
  return (
    <div className="container">
      <div className="center">
        <div className="Register">
          <p className="title-register">Login</p>
          <div>
            <label
              htmlFor=""
              className={`label-validator  ${errors.email === 'Невірна почта!' ? 'error' : ''}`}>
              {errors.email === 'Невірна почта!' ? 'Невірна почта!' : 'Почта'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`inputs-register ${errors.email === 'Невірна почта!' ? 'error' : ''}`}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className={`label-validator ${
                errors.password === 'Пароль має бути з 5 буквами!' ? 'error' : ''
              }`}>
              {errors.password === 'Пароль має бути з 5 буквами!'
                ? 'Пароль має бути з 5 буквами!'
                : 'Пароль'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`inputs-register ${
                errors === 'Пароль має бути з 5 буквами!' ? 'error' : ''
              }`}
            />
          </div>
          <p className="errors">{errors}</p>
          <p className="EAccount">
            Нема акаунт ? <Link to="/register">Нажми на мене</Link>
          </p>
          <p onClick={() => PostLogin()} className="btn-submit">
            Залогиниться
          </p>
        </div>
      </div>
    </div>
  );
}
