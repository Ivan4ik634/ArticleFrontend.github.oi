import { useState } from 'react';
import '../../css/Home/Category.css';
export default function Category({ CategoryId, setCategoryId }) {
  return (
    <div className="container">
      <div className="Category">
        <p
          onClick={() => setCategoryId(1)}
          className={`Category_item ${CategoryId === 1 ? 'active' : ''}`}>
          Гарні
        </p>
        <p
          onClick={() => setCategoryId(2)}
          className={`Category_item ${CategoryId === 2 ? 'active' : ''}`}>
          Топові
        </p>
        {window.localStorage.getItem('token') ? (
          <p
            onClick={() => setCategoryId(3)}
            className={`Category_item ${CategoryId === 3 ? 'active' : ''}`}>
            Від подпищіков
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
