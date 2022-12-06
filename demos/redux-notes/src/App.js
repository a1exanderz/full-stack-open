import { useEffect } from "react";

import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisbilityFilter from "./components/VisibilityFilter";

import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisbilityFilter />
      <Notes />
    </div>
  );
};

export default App;
