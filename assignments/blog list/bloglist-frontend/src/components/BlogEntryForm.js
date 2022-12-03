const BlogEntryForm = ({ onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <h2>create new</h2>
      <div>
        title <input placeholder="title" />
      </div>
      <div>
        author <input placeholder="author" />
      </div>
      <div>
        url <input placeholder="url" />
      </div>
      <div>
        likes <input placeholder="likes" />
      </div>
      <button type="submit">create</button>
      <button type="reset">reset</button>
    </form>
  </div>
);

export default BlogEntryForm;
