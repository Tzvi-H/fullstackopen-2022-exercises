import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

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

    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old phone number with a new one?`
        )
      ) {
        const newPerson = { ...person, number: newNumber };
        const updatedPerson = await personServices.update(newPerson);
        setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : updatedPerson
          )
        );
        setNotification({
          class: "success",
          text: `successfully updated phone number`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
      return;
    }

    const newPerson = await personServices.create({
      name: newName,
      number: newNumber,
    });
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
    setNotification({ class: "success", text: `added ${newPerson.name}` });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleDeletePerson = async (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      await personServices.remove(person.id);
      const removedId = person.id;
      setPersons(persons.filter((person) => person.id !== removedId));
      alert("successfully removed");
    }
  };

  return (
    <div>
      <Notification notification={notification} />

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

      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
