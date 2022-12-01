const BlogEntryForm = ({ onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
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

export default BlogEntryForm;
