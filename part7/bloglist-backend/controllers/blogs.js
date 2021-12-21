const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

    return res.status(200).json(blogs);
  } catch (err) {
    return next(err);
  }
});

blogRouter.post('/', async (req, res, next) => {
  try {
    const {
      title, author, url, likes,
    } = req.body;

    if (!title || !author || !url) {
      return res.status(400);
    }

    const user = await User.findById(req.user.id);

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json('Not Found');

    return res.status(200).json(blog);
  } catch (err) {
    return next(err);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id: blogId } = req.params;
    const { id: userId } = req.user;
    const blog = await Blog.findById(blogId);

    if (blog.user.toString() === userId.toString()) {
      await Blog.deleteOne({ _id: blogId });
      return res.status(204).end();
    }

    return res.status(401).json({ error: 'unauthorized' });
  } catch (err) {
    return next(err);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, author, url, likes,
    } = req.body;
    const blog = {
      title,
      author,
      url,
      likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    if (!updatedBlog) return res.status(400).end();

    return res.status(200).json(updatedBlog);
  } catch (err) {
    return next(err);
  }
});

blogRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, author, url, likes,
    } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, {
      title, author, url, likes,
    }, { new: true });

    if (!updatedBlog) return res.status(400).end();
    return res.status(200).json(updatedBlog);
  } catch (err) {
    return next(err);
  }
});

module.exports = blogRouter;
