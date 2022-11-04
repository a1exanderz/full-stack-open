const Persons = ({
  persons,
  newFilter,
  deleteEntry,
  setPersons,
  setMessageContent,
}) => {
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
                setMessageContent({
                  action: "delete",
                  name: person.name,
                });
                setTimeout(() => {
                  setMessageContent(null);
                }, 2000);
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
