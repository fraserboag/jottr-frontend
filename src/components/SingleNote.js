import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/components/SingleNote.scss';
import SyncStatus from './SyncStatus';

export default function SingleNote(props) {

	// Set state
	const [syncStatus, setSyncStatus] = useState('synced');
	const [lastInputTime, setLastInputTime] = useState(Date.now());

	// Focus main textarea
	useEffect(() => {
		if (!props.activeNote) return
		if (document.querySelector('input.title') !== document.activeElement && document.getElementById('note-content') !== document.activeElement) {
			const el = document.querySelector('#note-content');
			el.focus();
			el.setSelectionRange(el.value.length, el.value.length);
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

		const newVal = e.target.value;
		if (field === 'title') props.updateNoteState({ title: newVal, content: props.activeNote.content }, props.activeNote._id);
		if (field === 'content') props.updateNoteState({ title: props.activeNote.title, content: newVal }, props.activeNote._id);
	}

	// Handle form submit
	const onSubmit = (e) => {
		e.preventDefault();

		setSyncStatus('syncing');

		const updatedNote = {
			userId: props.activeUser._id,
			title: props.activeNote.title,
			content: props.activeNote.content
		}

		axios.put('http://localhost:5000/notes/update/'+props.activeNote._id, updatedNote)
			.then(res => {
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
					<input
						className="title"
						type="text"
						placeholder="Title"
						value={props.activeNote.title}
						onChange={(e) => onChange(e, 'title')}
					/>
					<textarea
						id="note-content"
						value={props.activeNote.content}
						onChange={(e) => onChange(e, 'content')}
						placeholder="Start typing your note here..." 
					/>
					<input type="submit" className="submit" hidden />
				</form>
			</div>
		);

	} else {

		return (
			<div className="SingleNote">
			</div>
		);

	}
	
}