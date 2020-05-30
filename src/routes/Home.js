import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

import NotesList from '../components/NotesList';
import SingleNote from '../components/SingleNote';
import '../styles/routes/Home.scss';

export default function Home(props) {

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

	return (
		<div className="Home">
			<NotesList
				activeUser={props.activeUser}
				notes={notes}
				onClickDelete={onClickDelete}
				onCreateNote={onCreateNote}
				activeNoteId={id}
			/>
			<SingleNote
				activeUser={props.activeUser}
				activeNoteId={id}	
			/>
		</div>
	);
}