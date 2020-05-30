import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'normalize.css';

import Home from './routes/Home';
  
import './styles/App.scss';

export default function App() {

	// Set state
	const [activeUser, setActiveUser] = useState({});

	// Artificially set a "logged in" user
	useEffect(() => {
		const user = {
			userId: "5ec44b19dfc13e40a6bf136a",
			username: "Fraser",
		}
		setActiveUser(user);
	}, []);

	// Output UI	
	return (
		<Router>
			<Switch>
				<Route exact path="/"><Home activeUser={activeUser} /></Route>
				<Route path="/note/:id"><Home activeUser={activeUser} /></Route>
				<Route path="/login"></Route>
			</Switch>
		</Router>
	);

}
