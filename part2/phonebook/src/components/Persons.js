const Persons = ({ personsToShow }) => (
  <div>
    {personsToShow.map(({ name, number }) => (
      <p key={name}>
        {name} {number}
      </p>
    ))}
  </div>
);

export default Persons;
