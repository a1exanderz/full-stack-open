import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { displayNewEntryNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    console.log("newAnecdote", newAnecdote);
    dispatch(createNewAnecdote(newAnecdote));
    dispatch(displayNewEntryNotification(newAnecdote.content));
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

export default AnecdoteForm;
