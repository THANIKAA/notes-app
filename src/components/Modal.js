// Modal.js
import React, { useState, useEffect } from 'react';
import './Modal.scss';

function Modal({ handleClose, handleSave, noteToEdit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // If a note is being edited, set the title, body, and datetime
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setBody(noteToEdit.body);
      setDateTime(noteToEdit.dateTime);
    } else {
      // Set the current date and time when the modal opens for new note
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = now.toLocaleDateString(undefined, options);
      setDateTime(`${time} , ${date}`);
    }
  }, [noteToEdit]);

  const handleCreate = () => {
    if (title.trim() && body.trim()) {
      const newNote = { title, body, dateTime };
      handleSave(newNote);
      handleClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-datetime">Modf: {dateTime}</p>
        <div className="modal-buttons">
          <input
            type="text"
            className="modal-title"
            placeholder="Title...."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="create-button" onClick={handleCreate}>Save</button>
          <button className="cancel-button" onClick={handleClose}>Cancel</button>
        </div>
        <textarea
          className="modal-textarea"
          placeholder="Body..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default Modal;
