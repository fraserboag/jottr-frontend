import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/CreateNote.scss';

export default function CreateNote(props) {

	// Set state
	const [newNoteTitle, setNewNoteTitle] = useState('');

	// Router history hook
	const history = useHistory();

	// Handle change of title input 
	const onChangeTitle = (e) => {
		const val = e.target.value;
		setNewNoteTitle(val);
	}

	// Handle form submit
	const onSubmit = (e) => {
		e.preventDefault();

		const newNote = {
			userId: props.activeUser.userId,
			title: newNoteTitle,
			content: ''
		}

		axios.post('http://localhost:5000/notes/add', newNote)
			.then(res => {
				history.push('/note/' + res.data);
				props.onCreateNote();
				setNewNoteTitle('');
			})
			.catch(err => console.log(err));
		
	}
	
	// Output UI
	return (
		<form onSubmit={onSubmit} className="CreateNote">
			<input type="text" value={newNoteTitle} onChange={onChangeTitle} placeholder="Create new note..." />
			<input type="submit" value="Go" />
		</form>
	);

}