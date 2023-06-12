import React, { useState, useEffect } from "react";

const defaultParams = {
  id: null,
  name: "",
  contactNo: "",
  email: "",
  role: "",
  location: "",
};

export default function ContactForm() {
  const [params, setParams] = useState(defaultParams);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContactList(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contactList));
  }, [contactList]);

  const handleInputChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      // Edit existing contact
      const updatedList = contactList.map((contact) =>
        contact.id === params.id ? params : contact
      );
      setContactList(updatedList);
    } else {
      // Add new contact
      const newContact = {
        ...params,
        id: Date.now(),
      };
      setContactList([...contactList, newContact]);
    }

    setParams(defaultParams);
  };

  const handleEdit = (contact) => {
    setParams(contact);
  };

  const handleDelete = (contact) => {
    const updatedList = contactList.filter((c) => c.id !== contact.id);
    setContactList(updatedList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={params.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="contactNo">Contact Number</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={params.contactNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={params.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={params.role}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={params.location}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      <h1>Contact List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.contactNo}</td>
              <td>{contact.email}</td>
              <td>{contact.role}</td>
              <td>{contact.location}</td>
              <td>
                <button onClick={() => handleEdit(contact)}>Edit</button>
                <button onClick={() => handleDelete(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
