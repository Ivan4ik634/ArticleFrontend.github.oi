import User from '../img/Male User.png';
import '../css/Static.css';
import { Link } from 'react-router-dom';
export function Static({ title, Array }) {
  return (
    <div className="container">
      <div className="fullModels">
        <p>{title}</p>
        <p>Загалом:{Array !== 0 ? Array.length : '0'}</p>
        {Array.length !== 0
          ? Array.users.map((obj) => <UserModels {...obj} fullName={obj.fullName} />)
          : ''}
      </div>
    </div>
  );
}
function UserModels({ _id, fullName, imgURL }) {
  return (
    <Link to={`/profile/${_id}`} className="link-text-none">
      <div className="User">
        <img src={User} alt="" className="user-img-models" />
        <div className="fullNameUser-Subscribe">
          <p>{fullName}</p>
        </div>
      </div>
    </Link>
  );
}
