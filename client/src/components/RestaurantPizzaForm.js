import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function RestaurantPizzaForm() {
  const [restaurants, setRestaurants] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState(0);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then(setRestaurants);
  }, []);

  useEffect(() => {
    fetch("/pizzas")
      .then((r) => r.json())
      .then(setPizzas);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      restaurant_id: restaurantId,
      pizza_id: pizzaId,
      price,
    };
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        history.push(`/restaurants/${restaurantId}`);
      } else {
        r.json().then((err) => setFormErrors(err.errors));
      }
    });
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <label style={labelStyle} htmlFor="pizza_id">
        Pizza:
      </label>
      <select
        style={selectStyle}
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
      >
        <option value="">Select a pizza</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label style={labelStyle} htmlFor="restaurant_id">
        Restaurant:
      </label>
      <select
        style={selectStyle}
        id="restaurant_id"
        name="restaurant_id"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      >
        <option value="">Select a restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <label style={labelStyle} htmlFor="price">
        Price:
      </label>
      <input
        style={inputStyle}
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={errorStyle}>
              {err}
            </p>
          ))
        : null}
      <button style={buttonStyle} type="submit">
        Add Restaurant Pizza
      </button>
    </form>
  );
}

const formStyle = {
  maxWidth: "400px",
  margin: "auto",
};

const labelStyle = {
  display: "block",
  margin: "10px 0",
};

const selectStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "15px",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
};

export default RestaurantPizzaForm;
