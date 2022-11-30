import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlogEntry = (event) => {
    event.preventDefault();

    const newBlogEntry = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
      likes: event.target[3].value,
    };

    blogService.create(newBlogEntry).then((returnedEntry) => {
      setBlogs(blogs.concat(returnedEntry));
    });
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
      console.log("Wrong credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const blogEntryForm = () => (
    <div>
      <form onSubmit={addBlogEntry}>
        <h2>create new</h2>
        <div>
          title <input />
        </div>
        <div>
          author <input />
        </div>
        <div>
          url <input />
        </div>
        <div>
          likes <input />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );

  return user === null ? (
    loginForm()
  ) : (
    <div>
      <p>
        {user.name} is logged in <button onClick={handleLogout}>log out</button>
      </p>
      {blogList()}
      {blogEntryForm()}
    </div>
  );
};

export default App;
