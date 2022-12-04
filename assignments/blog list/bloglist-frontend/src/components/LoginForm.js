import PropTypes from "prop-types";

const LoginForm = ({
  onSubmit,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={onSubmit}>
    <h2>log in to application</h2>
    <div>
      username
      <input
        type="text"
        value={username}
        id="username"
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        id="password"
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit" id="login-button">
      login
    </button>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
