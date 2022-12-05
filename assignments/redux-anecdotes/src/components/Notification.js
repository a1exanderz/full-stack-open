import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const DisplayNotification = ({ notification }) => {
    if (notification[0]) {
      if (notification[notification.length - 1].type === "vote") {
        return (
          <div style={style}>{`Voted for '${
            notification[notification.length - 1].content
          }'`}</div>
        );
      } else if (notification[notification.length - 1].type === "newEntry") {
        return (
          <div style={style}>{`Added new anecdote '${
            notification[notification.length - 1].content
          }'`}</div>
        );
      }
    }
  };
  return <DisplayNotification notification={notification} />;
};

export default Notification;
