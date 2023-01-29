import "../Modal/ModalStyled.css";

import { createPortal } from "react-dom";

import { Component } from "react";
const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    console.log("Modal DidMount");
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        console.log("Esc");
        this.props.onClose();
      }
    });
  }

  componentWillUnmount() {
    console.log("Modal Willunmount");
  }

  render() {
    return createPortal(
      <div className="backdrop">
        <div className="content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
