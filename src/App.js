import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [newNoteText, setNewNoteText] = useState(''); // New note text state
	const [editNoteId, setEditNoteId] = useState(null); // ID of the note being edited
	const [editText, setEditText] = useState(''); // Text being edited

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
	}, [notes]);

	const addNote = (text) => {
		if (!text.trim()) return;
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		setNotes([...notes, newNote]);
		setNewNoteText(''); // Clear the text area
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const startEditing = (id, text) => {
		setEditNoteId(id);
		setEditText(text);
	};

	const cancelEditing = () => {
		setEditNoteId(null);
		setEditText('');
	};

	const saveEdit = (id) => {
		setNotes(
			notes.map((note) =>
				note.id === id ? { ...note, text: editText } : note
			)
		);
		cancelEditing();
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />

				{/* New Note Section */}
				<div className='create-note'>
					<textarea
						rows='4'
						cols='50'
						placeholder='Write your new note here...'
						value={newNoteText}
						onChange={(e) => setNewNoteText(e.target.value)}
					></textarea>
					<button onClick={() => addNote(newNoteText)}>Create Note</button>
				</div>

				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					handleStartEditing={startEditing}
					handleCancelEditing={cancelEditing}
					handleSaveEdit={saveEdit}
					editNoteId={editNoteId}
					editText={editText}
					setEditText={setEditText}
				/>
			</div>
		</div>
	);
};

export default App;
