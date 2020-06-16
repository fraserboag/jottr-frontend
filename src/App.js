import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'normalize.css';

import Home from './routes/Home';
import Signup from './routes/Signup';
import Login from './routes/Login';
  
import './styles/App.scss';

import axios from 'axios';
axios.defaults.withCredentials = true;

export default function App() {

	// Set state
	const [activeUser, setActiveUser] = useState({
		_id: 0
	});

	const [sessionData, setSessionData] = useState({
		loggedIn: false,
		checkedSession: false
	});

	// Check if there's an active session on first load
	useEffect(() => {
		axios.get('http://localhost:5000/auth')
			.then(res => {
				if (res.data.user) {
					setActiveUser({ _id: res.data.user._id });
					setSessionData({ loggedIn: true, checkedSession: true });
				} else {
					setSessionData({ loggedIn: false, checkedSession: true });
				}
			})
			.catch(err => console.log(err));	
	}, []);

	const updateUser = (data) => {
		setActiveUser(data);
		setSessionData({ loggedIn: true, checkedSession: true });
	}

	const logoutUser = () => {
		setActiveUser({ _id: 0 });
		setSessionData({ loggedIn: false, checkedSession: true });
	}

	// Output UI	
	return (
		<Router>
			{sessionData.checkedSession &&
				<Switch>
					<Route exact path="/">
						{sessionData.loggedIn ? <Home activeUser={activeUser} logoutUser={logoutUser} /> : <Redirect to="/login" />}
					</Route>
					<Route path="/note/:id">
						{sessionData.loggedIn ? <Home activeUser={activeUser} logoutUser={logoutUser} /> : <Redirect to="/login" />}
					</Route>
					<Route path="/signup">
						{sessionData.loggedIn ? <Redirect to="/" /> : <Signup />}
					</Route>
					<Route path="/login" >
						{sessionData.loggedIn ? <Redirect to="/" /> : <Login updateUser={updateUser} />}
					</Route>
					<Route path="*"><Redirect to="/" /></Route>
				</Switch>
			}
		</Router>
	);

}
