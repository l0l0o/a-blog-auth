import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const toast = (
  text: string,
  type: "success" | "warn" | "danger" | "info",
  destination?: string
) => {
  let style = "";

  switch (type) {
    case "success":
      style = "linear-gradient(to right, #00b09b, #96c93d)";
      break;
    case "warn":
      style = "linear-gradient(to right, #ffb347, #ffcc33)";
      break;
    case "danger":
      style = "linear-gradient(to right, #ff5f6d, #ffc3a0)";
      break;
    case "info":
      style = "linear-gradient(to right, #00c6ff, #0072ff)";
      break;
  }

  Toastify({
    text: text,
    duration: 3000,
    destination: destination,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: style,
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

export default toast;
