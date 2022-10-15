import { toast } from "react-toastify";

const toastProps = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const alertToast = (alertType, msg) => {
  switch (alertType) {
    case "success":
      toast.success(msg, toastProps);
      break;
    case "warning":
      toast.warning(msg, toastProps);
      break;
    case "error":
      toast.error(msg, toastProps);
      break;
    case "info":
      toast.info(msg, toastProps);
      break;

    default:
      toast(msg, { ...toastProps, theme: "light" });
      break;
  }
};
