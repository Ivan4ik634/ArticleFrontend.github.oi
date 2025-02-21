import Header from '../components/Header';
import Category from '../components/Home/Category';
import Post from '../components/Home/Post';
import Tags from '../components/Home/Tags';
import '../css/Home/Home.css';
import axios from '../components/axios';
import Skeleton from '../components/Skeleton';
import { useEffect, useState } from 'react';
export default function HomePage() {
  const [items, setItems] = useState([]);
  const [itemsTags, setItemsTags] = useState([]);

  const [itemsSubscribe, setItemsSubscribe] = useState([]);

  const [Loading, setLoading] = useState([]);
  const [CategoryId, setCategoryId] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get('/posts')
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    if (window.localStorage.getItem('token')) {
      axios.get('/posts/subscribes').then((res) => setItemsSubscribe(res.data));
    }
  }, []);
  const fulteredTop = () => {
    return [...items]
      .sort((a, b) => b.likes.length - a.likes.length)
      .filter((obj) => {
        if (itemsTags.length === 0) return true;

        const postTags = obj.tags;
        const userTags = itemsTags.map((tagObj) => tagObj.tag);

        return userTags.some((tag) => postTags.includes(tag));
      });
  };

  const fulteredItems = items.filter((obj) => {
    if (itemsTags.length === 0) return true;

    const postTags = obj.tags;
    const userTags = itemsTags.map((tagObj) => tagObj.tag);

    return userTags.some((tag) => postTags.includes(tag));
  });
  const fulteredSubscribeItems = itemsSubscribe.filter((obj) => {
    if (itemsTags.length === 0) return true;

    const postTags = obj.tags;
    const userTags = itemsTags.map((tagObj) => tagObj.tag);

    return userTags.some((tag) => postTags.includes(tag));
  });
  return (
    <>
      <Header></Header>
      <Category CategoryId={CategoryId} setCategoryId={setCategoryId}></Category>
      <div className="container">
        <div className="flex-model">
          <div className={`Items ${Loading ? 'centerSkeleton' : ''}`}>
            {CategoryId === 1 ? (
              Loading ? (
                <Skeleton />
              ) : fulteredItems.length === 0 ? (
                <p className="NotPosts">Нету постов по таким тэгам</p>
              ) : (
                fulteredItems.map((obj) => <Post {...obj} posts={items} setPosts={setItems} />)
              )
            ) : (
              ''
            )}
          </div>
          <div>
            {CategoryId === 2 ? (
              fulteredTop().length === 0 ? (
                <p className="NotPosts">Нету постов по таким тэгам</p>
              ) : (
                fulteredTop().map((obj) => <Post {...obj} />)
              )
            ) : (
              ''
            )}
          </div>
          {window.localStorage.getItem('token') ? (
            <div>
              {CategoryId === 3 ? (
                fulteredSubscribeItems.length === 0 ? (
                  <p className="NotPosts">Нету постов по таким тэгам или у вас нету подписок </p>
                ) : (
                  fulteredSubscribeItems.map((obj) => <Post {...obj} />)
                )
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}

          <Tags itemsTags={itemsTags} setItemsTags={setItemsTags} />
        </div>
      </div>
    </>
  );
}
