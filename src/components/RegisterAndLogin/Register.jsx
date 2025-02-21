import User from '../../img/Male User.png';
import '../../css/RegisterAndLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useEffect, useState } from 'react';
export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  const register = () => {
    axios
      .post('/auth/register', {
        fullName: fullName,
        email: email,
        password: password,
      })
      .then((res) => {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('Auth', true);
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error('Unexpected error:', error);
        }
      });
  };
  return (
    <div className="container">
      <div className="center">
        <div className="Register">
          <p className="title-register">Register</p>
          <img src={User} alt="" className="userMale" />
          <div>
            <label
              htmlFor=""
              className={`label-validator ${
                errors.fullName === "Ім'я має бути з 3-ма буквами!" ? 'error' : ''
              }`}>
              {errors.fullName === "Ім'я має бути з 3-ма буквами!"
                ? "Ім'я має бути з 3-ма буквами!"
                : "Iм'я"}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`inputs-register ${
                errors.fullName === "Ім'я має бути з 3-ма буквами!" ? 'error' : ''
              }`}
            />
          </div>
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
                errors.password === 'Пароль має бути з 5 буквами!' ? 'error' : ''
              }`}
            />
          </div>
          <p className="errors">
            {errors.password === 'Такий юзер зареєстрований' ? 'Такий юзер зареєстрований' : ''}
          </p>
          <p className="EAccount">
            Є акаунт ? <Link to="/login">Нажми на мене</Link>
          </p>
          <p onClick={() => register()} className="btn-submit">
            Зареєструватись
          </p>
        </div>
      </div>
    </div>
  );
}
