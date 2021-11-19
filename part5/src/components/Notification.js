export const Notification = ({ type, message }) => {
  if (!message) return null;

  return (
    <div className={type === 'error' ? 'notification error' : 'notification'}>
      {message}
    </div>
  );
};
