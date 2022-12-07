import { connect } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { displayNewEntryNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createNewAnecdote(content);
    props.displayNewEntryNotification(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewAnecdote: (value) => {
      dispatch(createNewAnecdote(value));
    },
    displayNewEntryNotification: (value) => {
      dispatch(displayNewEntryNotification(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
