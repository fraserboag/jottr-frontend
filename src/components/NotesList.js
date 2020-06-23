import React from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import '../styles/components/NotesList.scss';
import CreateNote from '../components/CreateNote';
import LogoBar from '../components/LogoBar';

import { FiTrash2 } from 'react-icons/fi';
import { BsClock } from 'react-icons/bs';

export default function NotesList(props) {

	const history = useHistory();

	const deselectNote = () => {
		history.push('/');
	}

	return (
		<div className="NotesList" onClick={deselectNote}>
			
			<LogoBar logoutUser={props.logoutUser} />

			<ul>
				{props.notes.map((note, index) => (
					<li key={index} className={(note._id === props.activeNoteId) ? 'active' : ''}>
						<Link to={'/note/' + note._id} onClick={props.onOpenNote}>
							<div className="title">{note.title ? note.title : 'Untitled'}</div>
							<div className="timestamp"><BsClock /> 	{moment(note.updatedAt).fromNow()}</div>
						</Link>
						<span className="delete" onClick={(e) => { props.onClickDelete(note._id, e) }}><FiTrash2 /></span>
					</li>
				))}
			</ul>

			<CreateNote activeUser={props.activeUser} onCreateNote={props.onCreateNote} />

		</div>
	);
	
}