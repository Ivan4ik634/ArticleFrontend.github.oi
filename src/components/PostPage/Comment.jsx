import '../../css/FullPost/Comment.css';
import Avatar from '../../img/Male User.png';
import Like from '../../img/Facebook Like.png';
import axios from '../axios';
import { useEffect, useState } from 'react';
import Redact from '../../img/Pencil.svg';
import Close from '../../img/Close.png';
import Delete from '../../img/Delete.svg';
import ModalWindow from '../ModelDelete-Edit';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, UpdateOnSubmit, UpdateTitle } from '../../redux/slices/ModelsSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function CommentCreate({ _id, user, handleClickAndCreateArticle, errors }) {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="container">
      <div className="commentCreate">
        <div className="flex"></div>
        <div className="name-text">
          <p className="text-add-comment">Добавити коментарій</p>
          <p>{user.fullName}</p>
          <div className="bottom-comment">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`CommentTextInput ${errors ? 'error' : ''}`}
            />
            <label className={`label-commentText ${errors ? 'error' : ''}`}>
              {errors ? errors : 'Написати коментар'}
            </label>
            <p onClick={() => handleClickAndCreateArticle(_id, text, setText)} className="btn-post">
              Добавити коментарь
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Comment({
  _id,
  user,
  userMe,
  text,
  createdAt,
  comments,
  handleDelete,
  handelClickRedactComment,
  errorsEditComment,
  setErrorsEditComment,
}) {
  const [regimeRedactor, setRegimeRedactor] = useState(false);
  const [textRedact, setTextRedact] = useState('');

  // Находим текущий комментарий по ID
  const currentComment = comments.find((comment) => comment.comment._id === _id);
  const [likes, setLikes] = useState(currentComment?.comment.likes || []);
  const [dislikes, setDislikes] = useState(currentComment?.comment.dislikes || []);
  const navigate = useNavigate();
  const RedactorComment = () => {
    setRegimeRedactor(true);
  };

  const handleClickAndAddLikeComment = () => {
    axios
      .post(`/likes/comment/${_id}`, {
        action: 'like',
      })
      .then((res) => {
        setLikes(res.data.comment.likes);
        setDislikes(res.data.comment.dislikes);
      });
  };

  const handleClickAndAddDislakeComment = () => {
    axios
      .post(`/likes/comment/${_id}`, {
        action: 'dislike',
      })
      .then((res) => {
        setLikes(res.data.comment.likes);
        setDislikes(res.data.comment.dislikes);
      });
  };
  const handelClickCloseRedactor = () => {
    setRegimeRedactor(false);
    setErrorsEditComment('');
  };
  return (
    <div className="Comment-People">
      {userMe ? (
        userMe._id === user._id && !regimeRedactor ? (
          <div className="btn-redactor-delete">
            <img
              onClick={() => RedactorComment()}
              src={Redact}
              alt=""
              className="item_btn redactor-btn comment-item-btn-top"
            />
            <img
              onClick={() => handleDelete(_id)}
              src={Delete}
              alt=""
              className="item_btn delete-btn comment-item-btn-top"
            />
          </div>
        ) : (
          ''
        )
      ) : (
        ''
      )}
      <div className="Avatar-commentText">
        <img src={Avatar} alt="" className="Avatar-comment" />
        <div className="commentText">
          <div className={`${regimeRedactor ? 'errorsFlex' : ''}`}>
            {regimeRedactor ? (
              <>
                <Link
                  to={
                    userMe
                      ? userMe._id === user._id
                        ? `/profile`
                        : `/profile/${user._id}`
                      : `/profile/${user._id}`
                  }
                  className="fullName-user">
                  {user.fullName}
                </Link>
                <p>{createdAt}</p>
              </>
            ) : (
              <>
                <p>{createdAt}</p>
                <Link
                  to={
                    userMe
                      ? userMe._id === user._id
                        ? `/profile`
                        : `/profile/${user._id}`
                      : `/profile/${user._id}`
                  }
                  className="fullName-user">
                  {user.fullName}
                </Link>
              </>
            )}
          </div>

          {regimeRedactor ? (
            <div className="redact-comment">
              <img
                src={Close}
                onClick={() => handelClickCloseRedactor()}
                alt=""
                className="Close-redit-comment"
              />
              <input
                type="text"
                value={textRedact}
                onChange={(e) => setTextRedact(e.target.value)}
                className={`CommentTextInput ${errorsEditComment ? 'error' : ''}`}
              />
              <label
                className={`label-commentText editComment-label ${
                  errorsEditComment ? 'error' : ''
                }`}>
                {errorsEditComment ? errorsEditComment : 'Редагувати коментар'}
              </label>
              <a
                onClick={() => handelClickRedactComment(textRedact, _id, setRegimeRedactor)}
                className="btn-post btn-redactor-comment">
                Редагувати коментар
              </a>
            </div>
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>
      <div className="Grade-Comment">
        <div
          onClick={() => (userMe ? handleClickAndAddLikeComment() : navigate('/register'))}
          className="Like">
          {userMe ? (
            Array.isArray(likes) && likes.some((obj) => obj.user === userMe._id) ? (
              <i class="fa-solid fa-thumbs-up  fa-xl"></i>
            ) : (
              <i class="fa-regular fa-thumbs-up fa-xl"></i>
            )
          ) : (
            <i class="fa-regular fa-thumbs-up fa-xl"></i>
          )}

          <p>{likes.length}</p>
        </div>
        <div
          onClick={() => (userMe ? handleClickAndAddDislakeComment(_id) : navigate('/register'))}
          className="Dislike">
          {userMe ? (
            Array.isArray(dislikes) && dislikes.some((obj) => obj.user === userMe._id) ? (
              <i class="fa-solid fa-thumbs-up fa-rotate-180 fa-xl"></i>
            ) : (
              <i class="fa-regular fa-thumbs-up fa-rotate-180 fa-xl"></i>
            )
          ) : (
            <i class="fa-regular fa-thumbs-up fa-rotate-180 fa-xl"></i>
          )}

          <p>{dislikes.length}</p>
        </div>
      </div>
    </div>
  );
}
