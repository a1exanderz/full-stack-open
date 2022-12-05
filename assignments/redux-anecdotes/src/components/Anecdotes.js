import { useDispatch, useSelector } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { displayVoteNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);

  const vote = (anecdote, id) => {
    dispatch(incrementVote(id));
    dispatch(displayVoteNotification(anecdote.content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote, anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
