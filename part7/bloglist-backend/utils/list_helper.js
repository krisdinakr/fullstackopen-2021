const dummy = (blogs) => 1;

const reducer = (array, prop) => array.reduce((prev, curr) => (prev[prop] > curr[prop] ? prev : curr));

const totalLikes = (blogs) => {
  let result = 0;
  blogs.forEach((blog) => {
    result += blog.likes;
  });

  return result;
};

const favoriteBlog = (blogs) => {
  const result = reducer(blogs, 'likes');
  const { title, author, likes } = result;

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const blogArray = blogs.reduce((result, item) => {
    const author = result.find((i) => i.author === item.author);

    if (!author) {
      return result.concat({ author: item.author, blogs: 1 });
    }

    author.blogs += 1;
    return result;
  }, []);

  return reducer(blogArray, 'blogs');
};

const mostLikes = (blogs) => {
  const blogArray = blogs.reduce((result, item) => {
    const author = result.find((i) => i.author === item.author);

    if (!author) {
      return result.concat({ author: item.author, likes: item.likes });
    }

    author.likes += item.likes;

    return result;
  }, []);

  return reducer(blogArray, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
