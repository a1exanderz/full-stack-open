import { useState, useEffect } from "react";

import BlogList from "./components/BlogList";
import BlogEntryForm from "./components/BlogEntryForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { createNewBlog } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [notification, setNotification] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogEntry = (event) => {
    event.preventDefault();

    const newBlogEntry = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
      likes: event.target[3].value ? event.target[3].value : 0,
    };

    dispatch(createNewBlog(newBlogEntry));

    setNotification(`added ${newBlogEntry.title}, by ${newBlogEntry.author}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div>
      <ErrorMessage message={errorMessage} />
      {user === null ? (
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>log out</button>
          </p>
          <Notification message={notification} />
          <BlogList />
          <Togglable buttonLabel="create a new blog entry">
            <BlogEntryForm onSubmit={handleBlogEntry} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
