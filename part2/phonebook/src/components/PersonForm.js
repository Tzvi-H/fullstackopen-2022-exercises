const PersonForm = ({
  handlePersonFormSubmit,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => (
  <form onSubmit={handlePersonFormSubmit}>
    <div>
      name:{" "}
      <input
        value={newName}
        onChange={({ target }) => setNewName(target.value)}
      />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={({ target }) => setNewNumber(target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
