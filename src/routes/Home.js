import React from "react";
import NotesList from '../components/NotesList';
import SingleNote from '../components/SingleNote';
import '../styles/routes/Home.scss';

export default function Home(props) {
	return (
		<div className="Home">
			<NotesList activeUser={props.activeUser} />
			<SingleNote activeUser={props.activeUser} />
		</div>
	);
}