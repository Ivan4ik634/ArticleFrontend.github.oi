import { useNavigate, useParams } from 'react-router-dom';
import axios from '../components/axios';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import User from '../img/Male User.png';
import Settings from '../img/Settings.svg';
import { MyPosts } from '../components/Profile/MyPosts';
import '../css/ProfileUser/ProfileUser.css';

export default function ProfileUser() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [InfoUser, setInfoUser] = useState([]);
  const [InfoMe, setInfoMe] = useState([]);
  const [dataSubscribe, setDataSubscribe] = useState([]);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveBlockUser, setActiveBlockUser] = useState(false);

  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Открытие попапа
  const openPopup = () => setActiveSetting(!ActiveSetting);

  // Закрытие попапа
  const closePopup = () => setActiveSetting(false);

  // Закрытие по клику вне попапа
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closePopup();
      }
    }

    if (ActiveSetting) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ActiveSetting]);
  useEffect(() => {
    axios
      .get(`/${id}/posts`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/infoProfile/${id}`)
      .then((res) => {
        setDataSubscribe(res.data.subscribes.map((obj) => obj.user._id));
        setInfoUser(res.data);
        setInfoUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (window.localStorage.getItem('token')) {
      axios.get('/auth/me').then((res) => {
        setInfoMe(res.data);
      });
    }
  }, []);
  const handelClickSubscribe = () => {
    axios
      .post(`/subscribes/${InfoUser._id}`)
      .then((res) => setDataSubscribe(res.data.userSubscribe.subscribes.map((obj) => obj.user)));
  };
  const copyToClipboard = () => {
    const siteUrl = window.location.href;
    navigator.clipboard
      .writeText(siteUrl)
      .then(() => {
        alert('Ссылка скопирована в буфер обмена!');
      })
      .catch((err) => {
        console.error('Ошибка при копировании: ', err);
      });
  };
  return (
    <>
      <Header />
      <div className="container">
        <p className="profile-bykv">Профіль</p>
        <div className="Profile-full">
          <div className="Profile">
            <img src={User} alt="" />
            <div className="MyInfo">
              <p>Ім'я:{InfoUser.fullName}</p>
              {InfoMe ? (
                InfoMe._id === InfoUser._id ? (
                  ''
                ) : (
                  <a
                    onClick={() => handelClickSubscribe()}
                    className={`subscribe-btn padding-left-none ${
                      dataSubscribe.some((obj) => obj === InfoMe._id) ? 'notSubscribe' : ''
                    } 
                          } `}>
                    {dataSubscribe.some((obj) => obj === InfoMe._id)
                      ? 'Отписаться!'
                      : 'Подписаться!'}
                  </a>
                )
              ) : (
                ''
              )}
            </div>
          </div>

          <div ref={buttonRef} onClick={openPopup} className="Settings">
            <img src={Settings} alt="" className={`Settings ${ActiveSetting ? 'active' : ''}`} />
          </div>
        </div>
        {ActiveSetting && (
          <div className="flex-end">
            <div ref={popupRef}>
              <SettingsModal
                copyToClipboard={copyToClipboard}
                ActiveSetting={ActiveSetting}></SettingsModal>
            </div>
          </div>
        )}
        <div className="UserPosts">
          {ActiveBlockUser ? (
            <p>Ви його заблокували</p>
          ) : (
            items.map((obj) => (
              <MyPosts
                {...obj}
                commentsLength={obj.comments.length}
                dislikesLength={obj.dislikes.length}
                likesLength={obj.likes.length}
              />
            ))
          )}
          {}
        </div>
      </div>
    </>
  );
}

function SettingsModal({ ActiveSetting, copyToClipboard }) {
  return (
    <div className={`SettingsModel ${ActiveSetting === true ? 'active' : ''}`}>
      <a onClick={() => copyToClipboard()} className="item-setting">
        Репост
      </a>
    </div>
  );
}
