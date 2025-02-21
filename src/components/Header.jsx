import { Link } from 'react-router-dom';
import '../css/Header.css';
import { useEffect, useState } from 'react';
export default function Header() {
  useEffect(() => {
    if (window.localStorage.getItem('Auth')) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);
  const [Auth, setAuth] = useState(false);
  return (
    <div className="container">
      <div className="Header">
        <div className="logo">
          <Link to="/" className="logo-text">
            Logo
          </Link>
        </div>
        <div className="nav-right">
          {Auth === true ? (
            <div className="Auth">
              <Link to="/editPost" className="btn-post">
                Написати статтю
              </Link>
              <Link to="/profile" className="btn-post margin">
                Профіль
              </Link>
            </div>
          ) : (
            <Link to="/register" className="btn-post">
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
