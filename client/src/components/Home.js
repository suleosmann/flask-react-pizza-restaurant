import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then(setRestaurants);
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>All Restaurants</h2>
      <ul style={listStyle}>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} style={listItemStyle}>
            <Link to={`/restaurants/${restaurant.id}`} style={linkStyle}>
              {restaurant.name}
            </Link>
            <button onClick={() => handleDelete(restaurant.id)} style={deleteButtonStyle}>
              Delete Restaurant
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

const sectionStyle = {
  textAlign: "center",
  margin: "20px",
};

const headingStyle = {
  color: "#333",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
};

const listItemStyle = {
  margin: "10px 0",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyle = {
  textDecoration: "none",
  color: "#007BFF",
  fontWeight: "bold",
};

const deleteButtonStyle = {
  background: "#DC3545",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "3px",
  cursor: "pointer",
};

export default Home;
