export const FormCreate = ({
  handlerCreate,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => (
  <form onSubmit={handlerCreate}>
    <div>
      title:
      <input
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        required
      />
    </div>
    <div>
      author:
      <input
        type="text"
        name="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        required
      />
    </div>
    <div>
      url:
      <input
        type="text"
        name="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        required
      />
    </div>
    <button>create</button>
  </form>
);
