import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Restaurant() {
  const [{ data: restaurant, error, status }, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurants/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((restaurant) =>
          setRestaurant({ data: restaurant, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setRestaurant({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>{restaurant.name}</h2>
      <p style={addressStyle}>{restaurant.address}</p>

      <h3 style={subHeadingStyle}>Pizzas:</h3>
      <ul style={listStyle}>
        {restaurant.pizzas.map((pizza) => (
          <li key={pizza.id} style={listItemStyle}>
            {pizza.name}
          </li>
        ))}
      </ul>

      <Link to="/restaurant_pizzas/new" style={linkStyle}>
        Add Restaurant Pizza
      </Link>
    </section>
  );
}

const sectionStyle = {
  textAlign: "center",
  margin: "20px",
};

const headingStyle = {
  color: "#333",
  marginBottom: "10px",
};

const subHeadingStyle = {
  color: "#555",
  marginTop: "20px",
};

const addressStyle = {
  fontStyle: "italic",
  color: "#777",
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
};

const linkStyle = {
  textDecoration: "none",
  color: "#007BFF",
  fontWeight: "bold",
  display: "block",
  marginTop: "20px",
};

export default Restaurant;
