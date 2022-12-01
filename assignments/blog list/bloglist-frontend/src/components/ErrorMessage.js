const ErrorMessage = ({ message }) => {
  if (!message) {
    return;
  }
  return <div className="error">{message}</div>;
};

export default ErrorMessage;
