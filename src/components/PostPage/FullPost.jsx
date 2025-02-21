import User from '../../img/Male User.png';
import imgPost from '../../img/Abstract.png';
import Views from '../../img/Invisible.png';
import Comments from '../../img/Topic.png';

import Like from '../../img/Facebook Like.png';
import Close from '../../img/Close.png';
import Redact from '../../img/Pencil.svg';
import Delete from '../../img/Delete.svg';

import '../../css/FullPost/FullPost.css';
import CommentCreate, { Comment } from './Comment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';
export default function FullPost() {
  const { id } = useParams();
  const [Item, setItem] = useState();
  const [comments, setComments] = useState();

  const [Loading, setLoading] = useState(true);

  const [LikeLenght, setLikeLenght] = useState([]);
  const [dislikeLenght, setDislikeLenght] = useState([]);

  const [dataLike, setDataLike] = useState(false);
  const [dataDislike, setDataDislike] = useState(false);
  const [InfoMe, setInfoMe] = useState();
  const [Comments_items, setComments_items] = useState([]);
  const [dataSubscribe, setDataSubscribe] = useState([]);
  const [errors, setErrors] = useState('');
  const [errorsEditComment, setErrorsEditComment] = useState('');

  const [redactorMod, setRedactorMod] = useState(false);
  const [tagsRedact, setTagsRedact] = useState('');
  const [textRedact, setTextRedact] = useState('');
  const [titleRedact, setTitleRedact] = useState('');
  const [errorsRedactorPostMod, setErrorsRedactorPostMod] = useState('');

  useEffect(() => {
    setLoading(true);
    if (window.localStorage.getItem('token')) {
      axios.get('/auth/me').then((res) => setInfoMe(res.data));
    }
    axios.get(`/posts/${id}`).then((res) => {
      setItem(res.data);
      //setComments(res.data.comments);
      setLoading(false);
      setLikeLenght(res.data.likes);
      setDislikeLenght(res.data.dislikes);
      setDataSubscribe(res.data.user.subscribes);
      setDataLike(res.data.likes);
      setDataDislike(res.data.dislikes);
      setComments(res.data.comments);
    });
    axios.get(`/comment/${id}`).then((res) => setComments_items(res.data));
    if (window.localStorage.getItem('token')) {
      axios.get('/auth/me').then((res) => setInfoMe(res.data));
    }
  }, []);

  const LikePost = () => {
    axios
      .post(`/likes/${id}`, {
        action: 'like',
      })
      .then((res) => {
        setLikeLenght(res.data.post.likes);
        setDislikeLenght(res.data.post.dislikes);
        setDataLike(res.data.post.likes);
        setDataDislike(res.data.post.dislikes);
      });
  };
  const DislikePost = () => {
    axios
      .post(`/likes/${id}`, {
        action: 'dislike',
      })
      .then((res) => {
        setDislikeLenght(res.data.post.dislikes);
        setLikeLenght(res.data.post.likes);
        setDataLike(res.data.post.likes);
        setDataDislike(res.data.post.dislikes);
      });
  };
  const handleClickAndCreateArticle = async (_id, text, setText) => {
    await axios
      .post(`/comment/${_id}`, {
        text,
      })
      .then((res) => {
        setErrors('');
        setText('');
      })
      .catch((res) => setErrors(res.response.data.errors[0].msg));
    axios.get(`/comment/${id}`).then((res) => {
      setComments_items(res.data);
    });
  };
  const handleDeleteComment = async (_id) => {
    try {
      await axios.delete(`/comment/${id}/${_id}`);
      setComments_items(Comments_items.filter((obj) => obj.comment._id !== _id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  const handelClickRedactComment = async (text, _id, setRegimeRedactor) => {
    await axios
      .patch(`/comment/${id}/${_id}`, { text })
      .then((res) => {
        setRegimeRedactor(false);
        setErrorsEditComment('');
      })
      .catch((res) => setErrorsEditComment(res.response.data.errors[0].msg));
    axios.get(`/comment/${id}`).then((res) => {
      setComments_items(res.data);
    });
  };
  const handelClickSubscribe = () => {
    axios
      .post(`/subscribes/${Item.user._id}`)
      .then((res) => setDataSubscribe(res.data.userSubscribe.subscribes));
  };
  const RedactorClickBtn = () => {
    setRedactorMod(true);
  };
  const handelClickCloseRedactModPost = () => {
    setRedactorMod(false);
    setTagsRedact('');
    setTitleRedact('');
    setTextRedact('');
    setErrorsRedactorPostMod('');
  };
  const PostAxiosRedactPost = async () => {
    await axios
      .patch(`/posts/${id}`, {
        tags: tagsRedact,
        text: textRedact,
        title: titleRedact,
      })
      .then((res) => {
        setRedactorMod(false);
        setTagsRedact('');
        setTitleRedact('');
        setTextRedact('');
        setErrorsRedactorPostMod('');
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrorsRedactorPostMod(backendErrors);
        } else {
          console.error('Unexpected error:', error);
        }
      });
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const DeletePostClickBtn = async () => {
    await axios
      .delete(`/posts/${id}`)
      .then((res) => navigate('/profile'))
      .catch((res) => console.log(res));

    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!Loading ? (
        <div className="container">
          <div className="center">
            <div className={`Post width auto ${`${Item.imgURL}` ? '' : 'imgNot'}`} id={id}>
              <div className="top-post">
                {Item.imgURL ? (
                  <img
                    src={`http://localhost:5555${Item.imgURL}`}
                    alt=""
                    className="top-post img"
                  />
                ) : (
                  ''
                )}
              </div>
              {InfoMe ? (
                InfoMe._id === Item.user._id ? (
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
                        className="item_btn redactor-btn mobile"
                      />
                      <img
                        onClick={() => DeletePostClickBtn()}
                        src={Delete}
                        alt=""
                        className="item_btn delete-btn mobile"
                      />
                    </div>
                  )
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              <div className="bottom-post">
                <div className="FullName">
                  <Link
                    to={`${
                      InfoMe
                        ? InfoMe._id === Item.user._id
                          ? '/profile'
                          : `/profile/${Item.user._id}`
                        : `/profile/${Item.user._id}`
                    }`}>
                    <img src={User} alt="" className="Avatar " />
                  </Link>
                  <div className="right-fullName">
                    <div>
                      <Link
                        to={`${
                          InfoMe
                            ? InfoMe._id === Item.user._id
                              ? '/profile'
                              : `/profile/${Item.user._id}`
                            : `/profile/${Item.user._id}`
                        }`}
                        className="user-profil">
                        {Item.user.fullName}
                      </Link>
                      {InfoMe ? (
                        InfoMe._id === Item.user._id ? (
                          ''
                        ) : (
                          <a
                            onClick={() => handelClickSubscribe()}
                            className={`subscribe-btn ${
                              dataSubscribe.some((obj) => obj.user === InfoMe._id)
                                ? 'notSubscribe'
                                : ''
                            } 
                          }`}>
                            {dataSubscribe.some((obj) => obj.user === InfoMe._id)
                              ? 'Отписаться!'
                              : 'Подписаться!'}
                          </a>
                        )
                      ) : (
                        ''
                      )}
                    </div>
                    <p>{Item.createdAt}</p>
                  </div>
                </div>
                <div className="tags-title">
                  {redactorMod ? (
                    <div className="inputs-redact-post">
                      <label
                        htmlFor=""
                        className={`label-input-redact-post ${
                          errorsRedactorPostMod.title ? 'error' : ''
                        }`}>
                        {errorsRedactorPostMod.title ? errorsRedactorPostMod.title : 'Заголовок'}
                      </label>
                      <input
                        type="text"
                        value={titleRedact}
                        onChange={(e) => setTitleRedact(e.target.value)}
                        className={`inputs-redact-post_item ${
                          errorsRedactorPostMod.title ? 'error' : ''
                        }`}
                      />
                      <label
                        htmlFor=""
                        className={`label-input-redact-post ${
                          errorsRedactorPostMod.text ? 'error' : ''
                        }`}>
                        {errorsRedactorPostMod.text ? errorsRedactorPostMod.text : 'Текст'}
                      </label>
                      <input
                        type="text"
                        value={textRedact}
                        onChange={(e) => setTextRedact(e.target.value)}
                        className={`inputs-redact-post_item ${
                          errorsRedactorPostMod.text ? 'error' : ''
                        }`}
                      />
                      <label
                        htmlFor=""
                        className={`label-input-redact-post ${
                          errorsRedactorPostMod.tags ? 'error' : ''
                        }`}>
                        {errorsRedactorPostMod.tags ? errorsRedactorPostMod.tags : 'Тэги'}
                      </label>
                      <input
                        type="text"
                        value={tagsRedact}
                        onChange={(e) => setTagsRedact(e.target.value)}
                        className={`inputs-redact-post_item ${
                          errorsRedactorPostMod.tags ? 'error' : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="title">{Item.title}</h2>
                      <p className="text">{Item.text}</p>
                      <div className="tags-div-flex">
                        {Item.tags.map((obj) => (
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
                      <p className="checked">{Item.views}</p>
                    </div>
                    <div className="Comment">
                      <img src={Comments} alt="" className="Comment-img" />
                      <p className="checked">{Item.comments.length}</p>
                    </div>
                    <div
                      onClick={() => (InfoMe ? LikePost() : navigate('/register'))}
                      className="Like">
                      {InfoMe ? (
                        dataLike.some((obj) => obj.user === InfoMe._id) ? (
                          <i class="fa-solid fa-thumbs-up fa-xl"></i>
                        ) : (
                          <i className="fa-regular fa-thumbs-up fa-xl "></i>
                        )
                      ) : (
                        <i className="fa-regular fa-thumbs-up fa-xl "></i>
                      )}

                      <p className="checked">{LikeLenght.length}</p>
                    </div>
                    <div
                      onClick={() => (InfoMe ? DislikePost() : navigate('/register'))}
                      className="Dislike ">
                      {InfoMe ? (
                        dataDislike.some((obj) => obj.user === InfoMe._id) ? (
                          <i class="fa-solid fa-thumbs-up fa-rotate-180 fa-xl"></i>
                        ) : (
                          <i class="fa-regular fa-thumbs-up fa-rotate-180 fa-xl"></i>
                        )
                      ) : (
                        <i class="fa-regular fa-thumbs-up fa-rotate-180 fa-xl"></i>
                      )}
                      <p className="checked">{dislikeLenght.length}</p>
                    </div>
                  </div>
                  {redactorMod ? (
                    <p onClick={() => PostAxiosRedactPost()} className="btn-post">
                      Редагувати
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {InfoMe ? (
                redactorMod ? (
                  ''
                ) : (
                  <CommentCreate
                    _id={id}
                    user={InfoMe.fullName}
                    handleClickAndCreateArticle={handleClickAndCreateArticle}
                    errors={errors}></CommentCreate>
                )
              ) : (
                ''
              )}
              {redactorMod
                ? ''
                : Comments_items.map((obj) => (
                    <Comment
                      {...obj.comment}
                      comments={comments}
                      _idPost={id}
                      user={obj.comment.user}
                      userMe={InfoMe}
                      handleDelete={handleDeleteComment}
                      handelClickRedactComment={handelClickRedactComment}
                      errorsEditComment={errorsEditComment}
                      setErrorsEditComment={setErrorsEditComment}
                    />
                  ))}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
