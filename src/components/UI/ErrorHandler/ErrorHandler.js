import React from "react";
import Modal from "../Modal/Modal";

class ErrorHandler extends React.Component {

  constructor() {
    super();
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  updateState() {
    this.setState({
      error: null,
      errorInfo: null
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Modal onClickBackdrop={this.updateState.bind(this)}>
          <h1>Error: {this.state.error.message}</h1>
        </Modal>
      )
    }
    return this.props.children;
  }
}

export default ErrorHandler;
