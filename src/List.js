import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem, setDone, done }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, name, date, opis, tezina } = item;
        return (
          <article
            className="grocery-item"
            style={{ textDecoration: done ? `line-through` : "none" }}
            key={id}
          >
            <p className="title">{name}</p>
            {date}
            {opis}
            {tezina}

            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => setDone(!done)}
              >
                Done
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
