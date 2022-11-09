import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const level = ["nizak", "srednji", "visok"];
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [opis, setOpis] = useState("");
  const [tezina, setTezina] = useState("");
  const [done, setDone] = useState(false);

  // const [list, setList] = useState(getLocalStorage());
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date || !opis || !tezina) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name, date, opis, tezina };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        name,
        date,
        opis,
        tezina,
      };
      console.log(newItem);
      setList([...list, newItem]);
      setName("");
      setDate("");
      setOpis("");
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    const { name, date, opis, tezina } = specificItem;
    setIsEditing(true);
    setEditID(id);
    setName(name);
    setDate(date);
    setOpis(opis);
    setTezina(tezina);
    console.log("editing");
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="form-group grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>CRUD za zadatke:</h3>
        <div>
          <input
            type="text"
            className="form-control mb-2 grocery"
            placeholder="Enter the name of the assignment"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="start">Deadline:</label>

          <input
            className="form-control mb-2 "
            type="date"
            id="start"
            name="trip-start"
            value={date}
            min="today"
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Enter the description of the assignment"
            id="txtid"
            name="txtname"
            rows="4"
            cols="50"
            maxLength="200"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          ></textarea>

          <select
            className="form-control mb-2"
            onChange={(event) => setTezina(event.target.value)}
            value={tezina}
          >
            {level.map((l) => (
              <option key={Math.random()} value={l}>
                {l}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            setDone={setDone}
            done={done}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
