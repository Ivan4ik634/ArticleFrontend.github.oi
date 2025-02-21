import { useEffect, useState } from 'react';
import '../../css/Profile/Profile.css';
import axios from '../axios';
import { Link } from 'react-router-dom';
export default function GeneralInfo() {
  const [subscribes, setSubcribes] = useState([]);
  const [subscribesTo, setSubcribesTo] = useState([]);
  const [likesLength, setLikesLength] = useState([]);
  const [views, setViews] = useState([]);

  useEffect(() => {
    axios
      .get('/subscribes')
      .then((res) => setSubcribes(res.data))
      .catch((err) => console.log(err));
    axios
      .get('/subscribes/me')
      .then((res) => setSubcribesTo(res.data))
      .catch((err) => console.log(err));
    axios
      .get('/profile/posts')
      .then((res) => setLikesLength(res.data.map((obj) => obj.likes)))
      .catch((err) => console.log(err));
    axios
      .get('/profile/posts')
      .then((res) => setViews(res.data.map((obj) => obj.views)))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <p className="General-info-paragraf">Загалом</p>
      <div className="GeneralInfo">
        <Link to="/subscribeToMe" className="generalInfoItem">
          Слідкувачі: {subscribes.length}
        </Link>
        <Link to="/subscribe" className="generalInfoItem">
          Ви слідкуєте:{subscribesTo.length}
        </Link>
        <p className="generalInfoItem not-link">Загалом лайків:{likesLength.length}</p>
        <p className="generalInfoItem not-link">
          Загалом просмотров: {views.reduce((acc, curr) => acc + curr, 0)}
        </p>
      </div>
    </>
  );
}
