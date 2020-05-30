import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/NotesList.scss';
import CreateNote from '../components/CreateNote';
import LogoBar from '../components/LogoBar';

export default function NotesList(props) {

	return (
		<div className="NotesList">
			
			<LogoBar />

			<ul>
				{props.notes.map((note, index) => (
					<li key={index} className={(note._id === props.activeNoteId) ? 'active' : ''}>
						<Link to={'/note/' + note._id}>{note.title}</Link>
						<span className="delete" onClick={() => { props.onClickDelete(note._id) }}>Delete</span>
					</li>
				))}
			</ul>

			<CreateNote activeUser={props.activeUser} onCreateNote={props.onCreateNote} />

		</div>
	);
	
}