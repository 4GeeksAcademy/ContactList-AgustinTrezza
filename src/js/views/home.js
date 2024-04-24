import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://playground.4geeks.com/contact/agendas/agustintrezza')
      .then(response => response.json())
      .then(data => {
        setContacts(data.contacts);
        setLoading(false);
      })
      .catch(error => console.error('Error al obtener los datos de contacto:', error));
  }, []);

  const handleDelete = async (contactId) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar este contacto?");
      if (!confirmDelete) return;

      const response = await fetch(`https://playground.4geeks.com/contact/agendas/agustintrezza/contacts/${contactId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el contacto');
      }

      setContacts(contacts.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="text-start mt-5 container-custom-home-title">
          <h1 className="title">Contactos de Agustin Trezza</h1>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="col-md-8 mb-4 ">
                <Card>
                  <Card.Body>
                    <div className="container-grid-custom">
                      <div className="container-int">
                        <div>
                          <img className="img-fluid image" src="https://res.cloudinary.com/djpifu0cl/image/upload/v1713830789/imagen_vluimm.jpg" alt="Descripción de la imagen" />
                        </div>
                        <div>
                          <Card.Title className="fs-2">{contact.name}</Card.Title>
                          <Card.Text className="text-card"><FontAwesomeIcon className="text-secondary me-1" icon={faMapMarkerAlt} /> Address: {contact.address}</Card.Text>
                          <Card.Text className="text-card"><FontAwesomeIcon className="text-secondary me-1" icon={faPhone} /> Phone: {contact.phone}</Card.Text>
                          <Card.Text className="text-card"><FontAwesomeIcon className="text-secondary me-1" icon={faEnvelope} /> Email: {contact.email}</Card.Text>
                        </div>
                      </div>
                      
                      <div>
                        <Link to={`/edit-user/${contact.id}`} className="button-style">
                          <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.2em', color: '#108bf8' }} />
                        </Link>
                        <Button variant="link" className="button-style" onClick={() => handleDelete(contact.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '1.2em', color: '#ff5767' }} />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div>No hay contactos para mostrar.</div>
          )
        )}
      </div>
    </div>
  );
};
