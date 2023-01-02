import { useState } from "react";
import "./App.css";
import DataContacts from "./contacts.json";

function App() {
  const [contacts, setContact] = useState([...DataContacts.slice(5)]);
  const [filterContact, setFilterContact] = useState([
    ...DataContacts.slice(0, 5),
  ]);

  const handleRandomContact = () => {
    if (contacts.length > 0) {
      console.log(contacts.length);
      const randomIndex = Math.floor(Math.random() * contacts.length);
      console.log(randomIndex);

      setFilterContact([...filterContact, contacts[randomIndex]]);

      setContact(contacts.filter((c, i) => i !== randomIndex));
    } else {
      console.log("You have added all the contacts to the list");
    }
  };

  const handleSortByPopularityContact = () => {
    setFilterContact(
      [...filterContact].sort((a, b) => b.popularity - a.popularity)
    );
  };

  const handleSortByNameContact = () => {
    setFilterContact(
      [...filterContact].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  };

  const handleDeleteContact = (id) => {
    setFilterContact(filterContact.filter((c) => c.id !== id));
  };

  return (
    <div className="App">
      <h1>Iron Contacts Lab</h1>

      <div>
        <button onClick={handleRandomContact}>Add Random Contact</button>
        <button onClick={handleSortByPopularityContact}>
          Sort by popularity
        </button>
        <button onClick={handleSortByNameContact}>Sort by name</button>
      </div>

      <table className="contact-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterContact.map((c) => {
            return (
              <tr key={c.id}>
                <th>
                  <img src={c.pictureUrl} alt={c.name} width="100" />
                </th>
                <td>{c.name}</td>
                <td>{Math.round(c.popularity * 100) / 100}</td>
                <td>{c.wonOscar && "🏆​"}</td>
                <td>{c.wonEmmy && "🏆​"}</td>
                <td>
                  {" "}
                  <button onClick={() => handleDeleteContact(c.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
