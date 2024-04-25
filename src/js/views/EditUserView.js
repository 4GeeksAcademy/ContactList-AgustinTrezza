import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../../styles/demo.css";

export const EditUserView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://playground.4geeks.com/contact/agendas/agustintrezza`)
      .then(response => response.json())
      .then(data => {
        const contact = data.contacts.find(contact => contact.id === parseInt(id));
        if (contact) {
          setFormData(contact);
          setLoading(false);
        } else {
          throw new Error('User not found');
        }
      })
      .catch(error => console.error('Error fetching contact data:', error));
  }, [id]);

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
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/agustintrezza/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al editar el contacto');
      }

      
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mx-auto mt-4 form">
        <div className="text-start mt-5 title-form">
          <h2>Editar usuario</h2>
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
