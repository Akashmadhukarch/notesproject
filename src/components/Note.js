import { MdDeleteForever } from 'react-icons/md';

const Note = ({
	note,
	handleDeleteNote,
	handleStartEditing,
	handleCancelEditing,
	handleSaveEdit,
	isEditing,
	editText,
	setEditText,
}) => {
	return (
		<div className='note'>
			{/* Conditional rendering for editing mode */}
			{isEditing ? (
				<>
					{/* Textarea for editing */}
					<textarea
						rows='8'
						cols='10'
						placeholder='Edit your note...'
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					></textarea>
					<div className='note-footer'>
						{/* Save and Cancel buttons */}
						<button onClick={() => handleSaveEdit(note.id)}>Save</button>
						<button onClick={handleCancelEditing}>Cancel</button>
					</div>
				</>
			) : (
				<>
					{/* Display note text */}
					<span>{note.text}</span>
					<div className='note-footer'>
						{/* Date and Edit/Delete actions */}
						<small>{note.date}</small>
						<div>
							<button onClick={() => handleStartEditing(note.id, note.text)}>
								Edit
							</button>
							<button onClick={() => handleDeleteNote(note.id)}>
								<MdDeleteForever size='1.3em' />
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Note;
