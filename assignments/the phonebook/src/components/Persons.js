const Persons = ({ persons, newFilter, deleteEntry, setPersons }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    .map((person) => {
      return (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)) {
                deleteEntry(person.id);
                setPersons(persons.filter((orig) => orig.id !== person.id));
              }
            }}
          >
            delete
          </button>
        </div>
      );
    });
};

export default Persons;
