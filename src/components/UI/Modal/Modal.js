import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = props => {
  return ReactDOM.createPortal(
    <>
      <div className={classes.backdrop} onClick={props.onClickBackdrop}></div>
      <div className={classes.modal}>
        {props.children}
      </div>
    </>,
    document.getElementById('modal-root')
  );
}

export default Modal;