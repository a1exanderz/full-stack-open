const AddEntry = ({ addInfo }) => {
  return (
    <div>
      <h2>Create a new blog entry:</h2>
      <form onSubmit={addInfo}>
        <div>
          Title <input />
        </div>
        <div>
          Author <input />
        </div>
        <div>
          URL <input />
        </div>
        <div>
          Likes <input />
        </div>
        <button type="submit">Add</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};

export default AddEntry;
