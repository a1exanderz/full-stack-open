import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialNotes) => setPersons(initialNotes));
  }, []);

  const addInfo = (event) => {
    event.preventDefault();
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        const updatedEntry = {
          name: persons[i].name,
          number: newNumber,
          id: persons[i].id,
        };
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace old number with new one?`
          )
        ) {
          personService.update(persons[i].id, updatedEntry);
          persons.splice(i, 1, updatedEntry);
          setPersons(persons);
          setNewName("");
          setNewNumber("");
          return;
        }
      }
    }
    const newPersonEntry = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(newPersonEntry).then((returnedNote) => {
      setPersons(persons.concat(returnedNote));
      setNewName("");
      setNewNumber("");
    });
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addInfo={addInfo}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deleteEntry={personService.deleteEntry}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
