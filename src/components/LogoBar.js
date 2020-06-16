import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import '../styles/components/LogoBar.scss';

export default function LogoBar(props) {

	const history = useHistory();

	const onClickLogout = () => {
		axios.post('http://localhost:5000/auth/logout')
			.then(res => {
				console.log(res);
				props.logoutUser();
				history.push('/login');
			})
			.catch(err => console.log(err));
	}

	return (
		<div className="LogoBar">
			Jottr
			<span className="logout" onClick={onClickLogout}>Logout</span>
		</div>
	)
}