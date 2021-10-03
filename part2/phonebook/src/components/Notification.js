const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div className="notification">
      <span>{message}</span>
    </div>
  )
}

export default Notification;
