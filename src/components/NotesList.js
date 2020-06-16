import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import '../styles/components/NotesList.scss';
import CreateNote from '../components/CreateNote';
import LogoBar from '../components/LogoBar';

export default function NotesList(props) {

	return (
		<div className="NotesList">
			
			<LogoBar logoutUser={props.logoutUser} />

			<ul>
				{props.notes.map((note, index) => (
					<li key={index} className={(note._id === props.activeNoteId) ? 'active' : ''}>
						<Link to={'/note/' + note._id}>
							<div className="title">{note.title}</div>
							<div className="timestamp">{moment(note.updatedAt).fromNow()}</div>
						</Link>
						<span className="delete" onClick={() => { props.onClickDelete(note._id) }}>Delete</span>
					</li>
				))}
			</ul>

			<CreateNote activeUser={props.activeUser} onCreateNote={props.onCreateNote} />

		</div>
	);
	
}