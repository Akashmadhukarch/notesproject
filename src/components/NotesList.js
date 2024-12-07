import Note from './Note';

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleStartEditing,
	handleCancelEditing,
	handleSaveEdit,
	editNoteId,
	editText,
	setEditText,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
		<Note
		key={note.id}
		note={note}
		handleDeleteNote={handleDeleteNote}
		handleStartEditing={handleStartEditing} // Ensure this line is present
		handleCancelEditing={handleCancelEditing}
		handleSaveEdit={handleSaveEdit}
		isEditing={editNoteId === note.id}
		editText={editText}
		setEditText={setEditText}
	/>
			))}
		</div>
	);
};

export default NotesList;






