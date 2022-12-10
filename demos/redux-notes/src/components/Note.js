const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <button> {note.important ? "important" : "not important"}</button>
    </li>
  );
};

export default Note;
