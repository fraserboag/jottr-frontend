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
				setNotes(res.data);
			})
			.catch(err => console.log(err));
	}, [props]);

	// Get notes for current active user (on Mount)
	useEffect(() => {
		getNotes();
	}, [getNotes]);

	// Handle creation of new note (NotesList component)
	const onCreateNote = () => {
		getNotes();	
	}

	// Handle delete button click (NotesList component)
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

	// Handle note update (SingleNote component)
	const onUpdateNote = (updatedNote, updatedNoteId) => {
		setNotes(
			notes.map(note => note._id === updatedNoteId ? {
				...note,
				title: updatedNote.title,
				content: updatedNote.content
			} : note)
		);
	}

	return (
		<div className="Home">
			<NotesList
				activeUser={props.activeUser}
				notes={notes}
				activeNoteId={id}
				onClickDelete={onClickDelete}
				onCreateNote={onCreateNote}
			/>
			<SingleNote
				activeUser={props.activeUser}
				activeNote={notes.find(note => { return note._id === id })}
				onUpdateNote={onUpdateNote}
			/>
		</div>
	);
}