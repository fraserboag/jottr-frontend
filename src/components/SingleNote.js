import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../styles/components/SingleNote.scss';
import SyncStatus from './SyncStatus';

export default function SingleNote(props) {

	// Get ID from URL
	const { id } = useParams();

	// Set state
	const [note, setNote] = useState({ title: "", content: "" });
	const [syncStatus, setSyncStatus] = useState('synced');
	const [lastInputTime, setLastInputTime] = useState(Date.now());

	// Grab post from server
	useEffect(() => {
		if (id) {
			document.querySelector('#note-content').focus();
			axios.get('http://localhost:5000/notes/' + id)
				.then((res) => {
					setNote({
						title: res.data.title,
						content: res.data.content
					});
				})
				.catch(err => console.log(err));
		}
	}, [id]);

	// Set interval to listen for need to sync
	useEffect(() => {
		const syncChecker = setInterval(() => {
			const timeSinceLastInput = (Date.now()) - lastInputTime;
			if (syncStatus === 'not synced' && timeSinceLastInput > 500) {
				document.querySelector('#form-update-note .submit').click();
			}
		}, 1000);
		return () => clearInterval(syncChecker);
	}, [syncStatus, lastInputTime]);

	// Handle change of title input
	const onChangeTitle = (e) => {
		setSyncStatus('not synced');
		setLastInputTime(Date.now());
		const val = e.target.value;
		setNote((prevState) => {
			return { ...prevState, title: val }
		});
	}

	// Handle change of content textarea
	const onChangeContent = (e) => {
		setSyncStatus('not synced');
		setLastInputTime(Date.now());
		const val = e.target.value;
		setNote((prevState) => {
			return { ...prevState, content: val }
		});
	}

	// Handle form submit
	const onSubmit = (e) => {
		e.preventDefault();

		setSyncStatus('syncing');

		const updatedNote = {
			userId: props.activeUser.userId,
			title: note.title,
			content: note.content
		}

		axios.put('http://localhost:5000/notes/update/'+id, updatedNote)
			.then(res => {
				console.log(res.data);
				setTimeout(() => setSyncStatus('synced'), 500);				
			})
			.catch(err => console.log(err));
	}

	// Output UI
	if (id) {

		return (
			<div className="SingleNote">
				<form id="form-update-note" onSubmit={onSubmit}>
					<SyncStatus status={syncStatus} />
					<input className="title" type="text" value={note.title} onChange={onChangeTitle} placeholder="Title" />
					<textarea id="note-content" value={note.content} onChange={onChangeContent} placeholder="Start typing your note here..." />
					<input type="submit" className="submit" hidden />
				</form>
			</div>
		);

	} else {

		return (
			<div className="SingleNote">
				Please select a note
			</div>
		);

	}
	
}