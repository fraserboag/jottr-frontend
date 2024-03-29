import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

import NotesList from '../components/NotesList';
import SingleNote from '../components/SingleNote';
import '../styles/routes/Home.scss';

import apiUrl from '../env.js';

import { IoMdMenu } from 'react-icons/io';

export default function Home(props) {

	// Set state
	const [notes, setNotes] = useState([]);
	const [checkedForNotes, setCheckedForNotes] = useState(false);
	const [recentlySorted, setRecentlySorted] = useState(true);
	const [menuOpen, setMenuOpen] = useState(true);

	// Get ID from URL
	const { id } = useParams();

	// Router history hook
	const history = useHistory();

	// Get notes for current active user (on Mount)
	useEffect(() => {
		if(!props.activeUser._id) return

		axios.get(apiUrl + '/notes/byuser/' + props.activeUser._id)
			.then((res) => {
				setNotes(res.data);
				setCheckedForNotes(true);
			})
			.catch(err => console.log(err));

	}, [props.activeUser]);

	// Handle creation of new note
	const onCreateNote = (newNote) => {
		setNotes(notes => [newNote.data, ...notes]);
		setMenuOpen(false);
		history.push('/note/' + newNote.data._id);
	}

	// Handle delete button click (NotesList component)
	const onClickDelete = (deleteId, e) => {

		e.stopPropagation();

		const conf = window.confirm('Are you sure you want to delete this note? This cannot be undone.');

		if(conf){
			const updateState = notes.filter((note) => {
				return note._id !== deleteId;
			});
			setNotes(updateState);

			if (deleteId === id) history.push('/');

			axios.delete(apiUrl + '/notes/delete/' + deleteId)
				.catch(err => console.log(err));
		}
		
	}

	// Handle note update (SingleNote component)
	const updateNoteState = (updatedNote, updatedNoteId) => {

		let updatedNotes = notes.map(note => note._id === updatedNoteId ? {
			...note,
			title: updatedNote.title,
			content: updatedNote.content,
			updatedAt: Date.now()
		} : note);

		// Latest note rises to the top
		if (!recentlySorted) {
			setRecentlySorted(true);
			updatedNotes.sort((a, b) => {
				var keyA = new Date(a.updatedAt);
				var keyB = new Date(b.updatedAt);
				if (keyA < keyB) return 1;
				if (keyA > keyB) return -1;
				return 0;
			});
		}

		setNotes(updatedNotes);
	}

	const onOpenNote = (e) => {
		e.stopPropagation();
		setMenuOpen(false);
		setRecentlySorted(false);
	}

	const openMenu = () => {
		setMenuOpen(true);
	}

	const closeMenu = () => {
		setMenuOpen(false);
	}

	return (
		<div className="Home" data-menuopen={menuOpen}>
			{checkedForNotes &&
				<div className="wrapper">
					<NotesList
						activeUser={props.activeUser}
						notes={notes}
						activeNoteId={id}
						onOpenNote={onOpenNote}
						onClickDelete={onClickDelete}
						onCreateNote={onCreateNote}
						logoutUser={props.logoutUser}
					/>
					<SingleNote
						activeUser={props.activeUser}
						activeNote={notes.find(note => { return note._id === id })}
						updateNoteState={updateNoteState}
					/>
					<div className="mobile-toggle" onClick={openMenu}><IoMdMenu /></div>
					{menuOpen && <div className="mobile-menu-cover" onClick={closeMenu}></div> }
				</div>
			}
		</div>
	);
}