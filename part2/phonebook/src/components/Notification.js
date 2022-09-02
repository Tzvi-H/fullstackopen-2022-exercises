const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notification.class}>{notification.text}</div>;
};

export default Notification;
