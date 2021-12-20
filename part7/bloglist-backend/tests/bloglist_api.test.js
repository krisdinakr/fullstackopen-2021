const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  await api.post('/api/users').send(helper.initialUsers[0]);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('all blogs returned', async () => {
    const token = await helper.firstUserToken();

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('when token not defined', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('token missing');
  });

  describe('viewing a specific blog', () => {
    test('there is unique identifier named id', async () => {
      const token = await helper.firstUserToken();

      const blogsAtStart = await helper.blogsInDb();

      const blogToView = blogsAtStart[0];

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.body.id).toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const token = await helper.firstUserToken();

    const newBlog = {
      title: 'new blog title',
      author: 'johnny suh',
      url: 'www.jcc-fam.com',
      likes: 6,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('new blog title');
  });

  test('fails when no have token', async () => {
    const newBlog = {
      title: 'new blog title',
      author: 'johnny suh',
      url: 'www.jcc-fam.com',
      likes: 6,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toEqual('token missing');

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('property likes missing in request, default will be 0', async () => {
    const token = await helper.firstUserToken();

    const newBlog = {
      title: 'new blog title',
      author: 'mark lee',
      url: 'www.mark-lee.com',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const blogToView = blogsAtEnd.find((i) => i.title === 'new blog title');
    expect(blogToView.likes).toEqual(0);
  });

  test('fails with status code 400 if data invalid', async () => {
    const token = await helper.firstUserToken();

    const newBlog = {
      author: 'johnny',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succedds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mark__lee',
      name: 'Mark Lee',
      password: 'hellofuture',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    const invalidUser = {
      username: 'root',
      name: 'Mark Lee',
      password: 'hellofuture',
    };

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toMatch('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper status code and message if username and password character less than 2', async () => {
    const usersAtStart = await helper.usersInDb();
    const invalidUser = {
      username: 'hi',
      password: 'hi',
    };

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toMatch('shorter than the minimum allowed length (3)');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => mongoose.connection.close());
