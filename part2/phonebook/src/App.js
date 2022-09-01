import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadPersons = async () => {
      const persons = await personServices.getAll();
      setPersons(persons);
    };
    loadPersons();
  }, []);

  const personsToShow = persons.filter(({ name }) =>
    name.toLowerCase().startsWith(filter.toLowerCase())
  );

  const handlePersonFormSubmit = async (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }

    const newPerson = await personServices.create({
      name: newName,
      number: newNumber,
    });
    console.log(newPerson);
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setFilter={setFilter} filter={filter} />

      <h2>Add a new</h2>

      <PersonForm
        {...{
          handlePersonFormSubmit,
          setNewName,
          setNewNumber,
          newName,
          newNumber,
        }}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
