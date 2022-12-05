import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisbilityFilter from "./components/VisibilityFilter";

const App = () => {
  return (
    <div>
      <NewNote />
      <VisbilityFilter />
      <Notes />
    </div>
  );
};

export default App;
