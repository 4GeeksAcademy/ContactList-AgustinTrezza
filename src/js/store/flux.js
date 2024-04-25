// flux.js
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            message: "Este es un mensaje desde el store, consumiendo el contexto para recibir la info de los contactos y también para borrarlos."
        },
        actions: {
            loadSomeData: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/agustintrezza');
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos de contacto');
                    }
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            deleteContact: async (contactId) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/agustintrezza/contacts/${contactId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Error al eliminar el contacto');
                    }
                    const { store, actions } = getStore();
                    const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                    setStore({ contacts: updatedContacts });
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    };
};

export default getState;
