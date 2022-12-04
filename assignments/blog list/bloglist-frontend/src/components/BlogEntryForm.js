const BlogEntryForm = ({ onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <h2>create new</h2>
      <div>
        title <input placeholder="title" id="titleEntry" />
      </div>
      <div>
        author <input placeholder="author" id="authorEntry" />
      </div>
      <div>
        url <input placeholder="url" id="urlEntry" />
      </div>
      <div>
        likes <input placeholder="likes" id="likesEntry" />
      </div>
      <button type="submit" id="createEntryButton">
        create
      </button>
      <button type="reset" id="resetEntryButton">
        reset
      </button>
    </form>
  </div>
);

export default BlogEntryForm;
