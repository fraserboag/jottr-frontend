import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { BsPencil } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";


import '../styles/components/LogoBar.scss';

export default function LogoBar(props) {

	const history = useHistory();

	const onClickLogout = () => {
		axios.post('http://localhost:5000/auth/logout')
			.then(res => {
				props.logoutUser();
				history.push('/login');
			})
			.catch(err => console.log(err));
	}

	return (
		<div className="LogoBar">
			<span className="logo"><BsPencil /> Jottr</span>
			<span className="logout" onClick={onClickLogout}><RiLogoutBoxRLine /></span>
		</div>
	)
}