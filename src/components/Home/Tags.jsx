import { useEffect, useState } from 'react';
import '../../css/Home/Tags.css';
import Close from '../../img/Close.png';
import axios from '../axios';
export default function Tags({ itemsTags, setItemsTags }) {
  const [textTag, setTextTag] = useState('');
  useEffect(() => {
    axios
      .get('/tags')
      .then((res) => setItemsTags(res.data))
      .catch((res) => console.log(res));
  }, []);
  const createTags = async () => {
    await axios
      .post('/tags', {
        tag: textTag,
      })
      .then((res) => setTextTag(''))
      .catch((res) => console.log(res));
    axios
      .get('/tags')
      .then((res) => setItemsTags(res.data))
      .catch((res) => console.log(res));
  };
  const deleteAllTags = async () => {
    await axios
      .delete(`/tags`)
      .then((res) => setTextTag(''))
      .catch((res) => console.log(res));
    axios
      .get('/tags')
      .then((res) => setItemsTags(res.data))
      .catch((res) => console.log(res));
  };
  const deleteTags = async (id) => {
    await axios
      .delete(`/tags/${id}`)
      .then((res) => setTextTag(''))
      .catch((res) => console.log(res));
    axios
      .get('/tags')
      .then((res) => setItemsTags(res.data))
      .catch((res) => console.log(res));
  };
  return (
    <div className="Tags">
      <div className="btn-space-between">
        <p className="text-tags">Тэги</p>
        <img onClick={() => deleteAllTags()} src={Close} alt="" className="Close-img" />
      </div>
      {itemsTags.map((obj) => (
        <div className="add-teg">
          <p>{obj.tag}</p>
          <img onClick={() => deleteTags(obj._id)} src={Close} alt="" className="Close-img" />
        </div>
      ))}
      <div className="inputs-tags">
        <label className="tags-label">Добавить тэг</label>
        <input
          type="text"
          value={textTag}
          onChange={(e) => setTextTag(e.target.value)}
          className="tags-input"
        />
      </div>
      <p onClick={() => createTags()} className="btn-add-tags">
        Добавить
      </p>
    </div>
  );
}
