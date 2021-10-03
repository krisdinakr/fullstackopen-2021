const Notification = ({ notification }) => {
  
  if (!notification) return null;

  return (
    <div className={`notification notification--${notification[0]}`}>
      <span>{notification[1]}</span>
    </div>
  )
}

export default Notification;
