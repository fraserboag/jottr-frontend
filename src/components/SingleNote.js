import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/components/SingleNote.scss';
import SyncStatus from './SyncStatus';

export default function SingleNote(props) {

	// Set state
	const [note, setNote] = useState({ title: '', content: '' });
	const [syncStatus, setSyncStatus] = useState('synced');
	const [lastInputTime, setLastInputTime] = useState(Date.now());

	// Set active note to value passed into props
	useEffect(() => {
		if (props.activeNote) {
			setNote({
				title: props.activeNote.title,
				content: props.activeNote.content
			});
			document.querySelector('#note-content').focus();
		}
	}, [props.activeNote]);

	// Set interval to listen for need to sync
	useEffect(() => {
		const syncChecker = setInterval(() => {
			const timeSinceLastInput = (Date.now()) - lastInputTime;
			if (syncStatus === 'not synced' && timeSinceLastInput > 500) {
				document.querySelector('#form-update-note .submit').click();
			}
		}, 200);
		return () => clearInterval(syncChecker); // unmount
	}, [syncStatus, lastInputTime]);

	// Handle change of input
	const onChange = (e, field) => {
		setSyncStatus('not synced');
		setLastInputTime(Date.now());
		const val = e.target.value;
		if (field === 'title') setNote({ ...note, title: val });
		if (field === 'content') setNote({ ...note, content: val });
	}

	// Handle form submit
	const onSubmit = (e) => {
		e.preventDefault();

		setSyncStatus('syncing');

		const updatedNote = {
			userId: props.activeUser._id,
			title: note.title,
			content: note.content
		}

		axios.put('http://localhost:5000/notes/update/'+props.activeNote._id, updatedNote)
			.then(res => {
				props.onUpdateNote(updatedNote, props.activeNote._id); // notify parent
				setSyncStatus('synced');		
			})
			.catch(err => console.log(err));
	}

	// Output UI
	if (props.activeNote) {

		return (
			<div className="SingleNote">
				<form id="form-update-note" onSubmit={onSubmit}>
					<SyncStatus status={syncStatus} />
					<input className="title" type="text" value={note.title} onChange={(e) => onChange(e, 'title')} placeholder="Title" />
					<textarea id="note-content" value={note.content} onChange={(e) => onChange(e, 'content')} placeholder="Start typing your note here..." />
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