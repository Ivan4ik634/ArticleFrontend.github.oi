import { useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import SimpleMdeReact from 'react-simplemde-editor';
import '../css/Redactor/Readactor.css';
import axios from '../components/axios';
import { useNavigate } from 'react-router-dom';
export default function EditPostPage() {
  const [imgURL, setImgURL] = useState('');

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState('');

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const navigate = useNavigate();
  if (!window.localStorage.getItem('token')) {
    navigate('/');
  }
  const createPost = () => {
    axios
      .post('/posts', {
        title,
        text,
        tags: tags.split(/\s+/),
        imgURL,
      })
      .then((res) => {
        navigate(`/post/${res.data._id}`);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          // Собираем ошибки с бэкенда
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error('Unexpected error:', error);
        }
      });
  };
  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      console.log(data);
      setImgURL(data.url);
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = () => {
    setImgURL('');
  };
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="redactor">
          <h2>Створити статтю</h2>
          <div className="space-beetween">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <a onClick={handleButtonClick} className="btn-post">
              Вибрать фото
            </a>
            {imgURL ? (
              <>
                <a onClick={() => removeImage()} className="btn-add-post btn-remove">
                  Видалить фото
                </a>
              </>
            ) : (
              ''
            )}
          </div>
          {imgURL ? (
            <img
              className="img-post"
              src={`https://article-bacend-github-oi-o6fj-8n4lxr102-ivans-projects-94b08fd7.vercel.app${imgURL}`}
              alt=""
            />
          ) : (
            ''
          )}
          <div>
            <label htmlFor="" className={`label-redactor ${errors.title ? 'error' : ''}`}>
              {errors.title ? errors.title : 'Введите заголовок'}
            </label>
            <input
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`input-redactor title ${errors.title ? 'error' : ''} `}
            />

            <label htmlFor="" className={`label-redactor ${errors.text ? 'error' : ''}`}>
              {errors.text ? errors.text : 'Введите текст'}
            </label>
            <textarea
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`input-redactor textarea ${errors.text ? 'error' : ''}`}
            />

            <label htmlFor="" className={`label-redactor ${errors.tags ? 'error' : ''}`}>
              {errors.tags ? errors.tags : 'Введите тэги'}
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={`input-redactor margin-10 ${errors.tags ? 'error' : ''}`}
            />
          </div>
          <a onClick={() => createPost()} className="btn-post">
            Створить статтю
          </a>
        </div>
      </div>
    </>
  );
}
