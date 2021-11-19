export const FormLogin = ({
  handlerLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handlerLogin}>
    <div>
      username
      <input
        type="text"
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        name="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button>login</button>
  </form>
);
