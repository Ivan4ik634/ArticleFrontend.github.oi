import User from '../../img/Male User.png';
import imgPost from '../../img/Abstract.png';
import Views from '../../img/Invisible.png';
import Comments from '../../img/Topic.png';
import Redact from '../../img/Pencil.svg';
import Close from '../../img/Close.png';
import Delete from '../../img/Delete.svg';
import Like from '../../img/Facebook Like.png';

import '../../css/Home/Post.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';
export default function Post({
  user,
  createdAt,
  imgURL,
  title,
  text,
  tags,
  views,
  dislikes,
  likes,
  comments,
  _id,
  setPosts,
}) {
  const [InfoMe, setInfoMe] = useState();
  const [redactorMod, setRedactorMod] = useState(false);
  const [tagsRedact, setTagsRedact] = useState('');
  const [textRedact, setTextRedact] = useState('');
  const [titleRedact, setTitleRedact] = useState('');
  const [errors, setErrors] = useState('');
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      axios.get('/auth/me').then((res) => setInfoMe(res.data));
    }
  }, []);
  const RedactorClickBtn = () => {
    setRedactorMod(true);
  };
  const handelClickCloseRedactModPost = () => {
    setRedactorMod(false);
    setTagsRedact('');
    setTitleRedact('');
    setTextRedact('');
    setErrors('');
  };
  const PostAxiosRedactPost = async () => {
    await axios
      .patch(`/posts/${_id}`, {
        tags: tagsRedact,
        text: textRedact,
        title: titleRedact,
      })
      .then((res) => {
        setRedactorMod(false);
        setTagsRedact('');
        setTitleRedact('');
        setTextRedact('');
        setErrors('');
      })
      .catch((error) => {
        console.log(error);
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
    axios
      .get('/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteClickBtn = async () => {
    await axios.delete(`/posts/${_id}`);

    axios
      .get('/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={`Post ${imgURL ? 'Skelet' : 'imgNot'}`}>
      <div className="top-post div-image-full">
        {imgURL ? (
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:5555${imgURL}`} alt="" className="top-post image-post" />
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className="bottom-post">
        {InfoMe ? (
          InfoMe._id === user._id ? (
            redactorMod ? (
              <img
                onClick={() => handelClickCloseRedactModPost()}
                src={Close}
                alt=""
                className="Close-redact-post"
              />
            ) : (
              <div className="btn-redactor-delete post-hover">
                <img
                  onClick={() => RedactorClickBtn()}
                  src={Redact}
                  alt=""
                  className="item_btn redactor-btn"
                />
                <img
                  onClick={() => DeleteClickBtn()}
                  src={Delete}
                  alt=""
                  className="item_btn delete-btn"
                />
              </div>
            )
          ) : (
            ''
          )
        ) : (
          ''
        )}

        <div className="FullName">
          <Link
            to={`${
              InfoMe
                ? InfoMe._id === user._id
                  ? '/profile'
                  : `/profile/${user._id}`
                : `/profile/${user._id}`
            }`}>
            <img src={User} alt="" className="Avatar" />
          </Link>
          <div className="right-fullName">
            <Link
              to={`${
                InfoMe
                  ? InfoMe._id === user._id
                    ? '/profile'
                    : `/profile/${user._id}`
                  : `/profile/${user._id}`
              }`}
              className="user-profil">
              {user.fullName}
            </Link>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="tags-title">
          {redactorMod ? (
            <div className="inputs-redact-post">
              <label
                htmlFor=""
                className={`label-input-redact-post ${errors.title ? 'error' : ''}`}>
                {errors.title ? errors.title : 'Заголовок'}
              </label>
              <input
                type="text"
                value={titleRedact}
                onChange={(e) => setTitleRedact(e.target.value)}
                className={`inputs-redact-post_item ${errors.title ? 'error' : ''}`}
              />
              <label htmlFor="" className={`label-input-redact-post ${errors.text ? 'error' : ''}`}>
                {errors.text ? errors.text : 'Текст'}
              </label>
              <input
                type="text"
                value={textRedact}
                onChange={(e) => setTextRedact(e.target.value)}
                className={`inputs-redact-post_item ${errors.text ? 'error' : ''}`}
              />
              <label htmlFor="" className={`label-input-redact-post ${errors.tags ? 'error' : ''}`}>
                {errors.tags ? errors.tags : 'Тэги'}
              </label>
              <input
                type="text"
                value={tagsRedact}
                onChange={(e) => setTagsRedact(e.target.value)}
                className={`inputs-redact-post_item ${errors.tags ? 'error' : ''}`}
              />
            </div>
          ) : (
            <>
              <h2 className="title">{title}</h2>
              <p className="text">{text}</p>
              <div className="tags-div-flex">
                {tags.map((obj) => (
                  <a className="tags">{obj}</a>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="bottom-bottom-post">
          <div className="populate-and-bottom-post">
            <div className="Views">
              <img src={Views} alt="" className="Views-img" />
              <p className="checked">{views}</p>
            </div>
            <div className="Comment">
              <img src={Comments} alt="" className="Comment-img" />
              <p className="checked">{comments.length}</p>
            </div>
            <div className="Like">
              <img src={Like} alt="" className="Like-img" />
              <p className="checked">{likes.length}</p>
            </div>
            <div className="Dislike">
              <img src={Like} alt="" className="Dislike-img" />
              <p className="checked">{dislikes.length}</p>
            </div>
          </div>
          {redactorMod ? (
            <p onClick={() => PostAxiosRedactPost()} className="btn-post">
              Редагувати
            </p>
          ) : (
            <Link to={`/post/${_id}`} className="btn-post">
              Перейти
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
