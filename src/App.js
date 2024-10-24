import React, { useState, useEffect } from 'react';
import './App.scss';
import Modal from './components/Modal';
import { FaSearch, FaSort } from 'react-icons/fa'; 
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleOpenModal = (note = null) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  const handleSaveNote = (newNote) => {
    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

    if (noteToEdit) {
      // Edit existing note
      const updatedNotes = existingNotes.map(note =>
        note.title === noteToEdit.title ? newNote : note
      );
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } else {
      // Add new note
      const updatedNotes = [...existingNotes, newNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    }
  };

  const handleDeleteNote = (noteToDelete) => {
    const updatedNotes = notes.filter(note => note.title !== noteToDelete.title);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };


  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSortToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

 
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div className="app-container">
      <header className="header">
        <div className="notes-header">
          <h1 className="title">Your Notes</h1>
          <button className="add-button" onClick={() => handleOpenModal()}>Add
          </button>
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange} // Update search input
            />
            <FaSort className="sort-icon" onClick={handleSortToggle} /> 
          </div>
        </div>
      </header>

      <div className="notes-grid">
        {sortedNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          sortedNotes.map((note, index) => (
            <div key={index} className="note-card" onClick={() => handleOpenModal(note)}>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-body">{note.body}</p>
              <p className="note-datetime">{note.dateTime}</p>
              <div className="note-actions">
                <button className="delete-button" onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteNote(note);
                }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <Modal
          handleClose={handleCloseModal}
          handleSave={handleSaveNote}
          noteToEdit={noteToEdit}
        />
      )}
    </div>
  );
}

export default App;
