const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDeletePerson(person)}>delete</button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
