import { useState, useEffect, useCallback } from 'react';
import { Blog, FormLogin, FormCreate, Notification } from './components';
import { BaseService } from './services';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const getBlogList = useCallback(async () => {
    if (user) {
      const blogList = await BaseService.get('/api/blogs', {}, user.token);
      setBlogs(blogList);
    }
  }, [user]);

  useEffect(() => {
    getBlogList();
  }, [getBlogList, user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('USER_LOGGED_IN');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await BaseService.post('/api/login', { username, password });
      setUser(user);
      window.localStorage.setItem('USER_LOGGED_IN', JSON.stringify(user));
    } catch (exception) {
      setErrorMessage(exception.message.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setUsername('');
    setPassword('');
  };

  const handlerLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handlerCreate = async (e) => {
    e.preventDefault();
    try {
      const result = await BaseService.post(
        '/api/blogs',
        { title, author, url },
        user.token
      );
      if (result.id) {
        setBlogs(blogs.concat(result));
        setSuccessMessage(
          `a new blog ${result.title} by ${result.author} added`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage(exception.message.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <>
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification type="error" message={errorMessage} />
          <Notification message={successMessage} />
          <span>{user.username} logged-in</span>
          <button onClick={handlerLogout}>logout</button>
          <h2>create new</h2>
          <FormCreate
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handlerCreate={handlerCreate}
          />
          <br />
          {blogs.map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </div>
      )}
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification type="error" message={errorMessage} />
          <FormLogin
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handlerLogin={handlerLogin}
          />
        </div>
      )}
    </>
  );
};

export default App;
