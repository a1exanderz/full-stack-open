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
  const [messageContent, setMessageContent] = useState();

  useEffect(() => {
    personService.getAll().then((initialNotes) => setPersons(initialNotes));
  }, []);

  const Notification = (messageContent) => {
    const action = messageContent.content?.action;
    const name = messageContent.content?.name;
    const number = messageContent.content?.number;

    if (action === "add") {
      return <div className="notif">{`Added ${name}`}</div>;
    } else if (action === "update") {
      return (
        <div className="notif">{`Updated ${name}'s number to ${number}`}</div>
      );
    } else if (action === "delete") {
      return <div className="notif">{`Deleted ${name} from the server`}</div>;
    } else if (action === "remove error") {
      return (
        <div className="error">{`${name} has already been removed from server`}</div>
      );
    }
  };

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
          personService
            .update(persons[i].id, updatedEntry)
            .then()
            .catch((error) => {
              console.log("error");
              setMessageContent({
                action: "remove error",
                name: persons[i].name,
              });
              setTimeout(() => {
                setMessageContent(null);
              }, 2000);
              setPersons(persons.filter((p) => p.name !== persons[i].name));
            });

          persons.splice(i, 1, updatedEntry);
          setPersons(persons);
          setMessageContent({
            action: "update",
            name: newName,
            number: newNumber,
          });
          setTimeout(() => {
            setMessageContent(null);
          }, 2000);
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
      setMessageContent({
        action: "add",
        name: newName,
        number: newNumber,
      });
      setTimeout(() => {
        setMessageContent(null);
      }, 2000);
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
      <Notification content={messageContent} />
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
        setMessageContent={setMessageContent}
      />
    </div>
  );
};

export default App;
