import User from '../../img/Male User.png';
import Abstract from '../../img/Abstract.png';
import '../../css/Profile/MyPosts.css';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useEffect, useState } from 'react';
import Views from '../../img/Invisible.png';
import Like from '../../img/Facebook Like.png';
import CommentImg from '../../img/Topic.png';
import Delete from '../../img/Delete.svg';

export default function ProfilePosts() {
  const [PostsMe, setPostsMe] = useState([]);
  useEffect(() => {
    axios
      .get(`/profile/posts`)
      .then((res) => {
        setPostsMe(res.data);
      })
      .catch((error) => setPostsMe(''));
  }, []);
  return (
    <>
      <p className="post-bykv">Ваші пости</p>
      <div className="ProfilePosts">
        {PostsMe ? (
          PostsMe.map((obj) => (
            <MyPosts
              {...obj}
              setPostsMe={setPostsMe}
              FullName={obj.user.fullName}
              commentsLength={obj.comments.length}
              dislikesLength={obj.dislikes.length}
              likesLength={obj.likes.length}
            />
          ))
        ) : (
          <p className="post-bykv center-aling-justify">Немає статей!</p>
        )}
      </div>
    </>
  );
}
export function MyPosts({
  _id,
  title,
  createdAt,
  text,
  tags,
  imgURL,
  FullName,
  views,
  commentsLength,
  dislikesLength,
  likesLength,
}) {
  return (
    <Link to={`/post/${_id}`} className="text-none">
      <div className="MyPosts">
        {imgURL ? (
          <img src={`http://localhost:5555${imgURL}`} alt="Нету фото" className="top-myPost" />
        ) : (
          <a className="top-myPost bcgr-white">У цієї статті немає фото</a>
        )}

        <div className="bottom-myPost">
          <div className="fullInfoProfil">
            <img src={User} alt="" className="UserProfile-Avatar" />
            <div className="FullName_myposts">
              <p>{FullName}</p>
              <p>{createdAt}</p>
            </div>
          </div>

          <div className="InfoPost">
            <p>{title}</p>
            <p>{text}</p>
            <div className="statistic-space-between">
              <p>{tags}</p>
              <div className="flex gorizont">
                <div className="Views">
                  <img src={Views} alt="" className="img-static" />
                  <p>{views}</p>
                </div>
                <div className="Comment">
                  <img src={CommentImg} alt="" className="img-static" />
                  <p>{commentsLength}</p>
                </div>
                <div className="Like">
                  <img src={Like} alt="" className="img-static" />
                  <p>{likesLength}</p>
                </div>
                <div className="Like">
                  <img src={Like} alt="" className="img-static rotate-180" />
                  <p>{dislikesLength}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
