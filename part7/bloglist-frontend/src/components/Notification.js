import { useSelector } from "react-redux";

const Notification = (props) => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return null;

  const { type, message } = notification;

  return <div className={type}>{message}</div>;
};

export default Notification;
