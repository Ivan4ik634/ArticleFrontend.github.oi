import '../css/Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateOnSubmit, openModal } from '../redux/slices/ModelsSlice';
export default function ModalWindow() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.createModal.title);
  const StateOpenModal = useSelector((state) => state.createModal.openModal);
  const handelClickUpdateSubmit = () => {
    dispatch(UpdateOnSubmit(true));
    dispatch(openModal(false));
  };
  const handelClickNoUpdateSubmit = () => {
    dispatch(UpdateOnSubmit(false));
    dispatch(openModal(false));
  };
  return (
    <>
      {StateOpenModal ? (
        <>
          <div className={`overlay `}></div>
          <div className={`modal `}>
            <div className="if-modal-two-btn">
              <h1>{title}</h1>
              <div className="btns">
                <a className="btn-modal" onClick={() => handelClickNoUpdateSubmit()}>
                  Отмена
                </a>
                <a className="btn-modal" onClick={() => handelClickUpdateSubmit()}>
                  Сделать
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
