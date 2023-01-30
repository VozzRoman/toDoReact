import "../Modal/ModalStyled.css";

import { createPortal } from "react-dom";

import { Component } from "react";
const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    console.log("Modal DidMount");
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      console.log("нужно закрить модалку");
      this.props.onClose();
    }
  };

  handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    console.log("Modal Willunmount");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className="backdrop" onClick={this.handleBackDropClick}>
        <div className="content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
