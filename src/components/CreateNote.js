import React, { useState } from "react";
import axios from 'axios';
import '../styles/components/CreateNote.scss';
import apiUrl from '../env.js';

export default function CreateNote(props) {

	// Set state
	const [newNoteTitle, setNewNoteTitle] = useState('');

	// Handle change of title input 
	const onChangeTitle = (e) => {
		const val = e.target.value;
		setNewNoteTitle(val);
	}

	// Handle form submit
	const onSubmit = (e) => {
		e.preventDefault();

		const newNote = {
			userId: props.activeUser._id,
			title: newNoteTitle,
			content: ''
		}

		axios.post(apiUrl + '/notes/add', newNote)
			.then(res => {
				props.onCreateNote(res);
				setNewNoteTitle('');
			})
			.catch(err => console.log(err));
		
	}
	
	// Output UI
	return (
		<form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()} className="CreateNote">
			<input type="text" value={newNoteTitle} onChange={onChangeTitle} placeholder="Create new note..." />
			<input type="submit" value="Go" />
		</form>
	);

}