const Notification = ({ message }) => {
  if (!message) {
    return;
  }
  return <div className="notif">{message}</div>;
};

export default Notification;
