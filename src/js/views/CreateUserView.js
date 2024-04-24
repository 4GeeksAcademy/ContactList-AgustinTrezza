import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/demo.css";

export const CreateUserView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://playground.4geeks.com/contact/agendas/agustintrezza/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el contacto');
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: ""
      });

      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit} className="mx-auto mt-4 form">
      <div className="text-start mt-5 title-form">
        <h2>Crear un nuevo contacto</h2>
      </div>
        <div className="form-group input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4 btn-save">
          Save
        </button>
        <Link to="/">
        <button className="btn anchor">or back to Contacts</button>
      </Link>
      </form>
      <br />
      
    </div>
  );
};
