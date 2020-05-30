import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';

import '../styles/components/NotesList.scss';
import CreateNote from '../components/CreateNote';
import LogoBar from '../components/LogoBar';

export default function NotesList(props) {

	// Set state
	const [notes, setNotes] = useState([]);

	// Get ID from URL
	const { id } = useParams();

	// Router history hook
	const history = useHistory();

	// Reuseable function to get notes from server
	const getNotes = useCallback(() => {
		axios.get('http://localhost:5000/notes/byuser/' + props.activeUser.userId)
			.then((res) => {
				console.log(res.data);
				setNotes(res.data);
			})
			.catch(err => console.log(err));
	}, [props]);

	// Get notes for current active user
	useEffect(() => {
		getNotes();
	}, [getNotes]);

	// Handle creation of new note
	const onCreateNote = () => {
		getNotes();	
	}

	// Handle delete button click
	const onClickDelete = (deleteId) => {
		axios.delete('http://localhost:5000/notes/delete/' + deleteId)
			.then(res => {
				const updateState = notes.filter((note) => {
					return note._id !== deleteId;
				});
				
				setNotes(updateState);

				if (deleteId === id) history.push('/');
			})
			.catch(err => console.log(err));
	}

	// Output UI
	return (
		<div className="NotesList">
			
			<LogoBar />

			<ul>
				{notes.map((note, index) => (
					<li key={index} className={(note._id === id) ? 'active' : ''}>
						<Link to={'/note/' + note._id}>{note.title}</Link>
						<span className="delete" onClick={() => { onClickDelete(note._id) }}>Delete</span>
					</li>
				))}
			</ul>
			<CreateNote activeUser={props.activeUser} onCreateNote={onCreateNote} />
		</div>
	);
	
}