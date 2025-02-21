import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from '../components/axios';
import { Static } from '../components/Static';
import { useNavigate } from 'react-router-dom';

export function SubscribePage() {
  const [subscribes, setSubcribes] = useState([]);
  const navigate = useNavigate();
  if (!window.localStorage.getItem('token')) {
    navigate('/');
  }
  useEffect(() => {
    axios
      .get('/subscribes/me')
      .then((res) => setSubcribes(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <Static title="Ви слідкуєте" Array={subscribes} />
    </>
  );
}

export function SubscribeToMePage() {
  const [subscribesTo, setSubcribesTo] = useState([]);
  const navigate = useNavigate();
  if (!window.localStorage.getItem('token')) {
    navigate('/');
  }
  useEffect(() => {
    axios
      .get('/subscribes')
      .then((res) => setSubcribesTo(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <Static title="На вас слідкують:" Array={subscribesTo} />
    </>
  );
}
