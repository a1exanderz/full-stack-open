const Persons = ({ persons, newFilter }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    .map((person) => {
      return (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      );
    });
};

export default Persons;
