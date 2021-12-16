import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = props => {
  return ReactDOM.createPortal(
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
}

export default Modal;