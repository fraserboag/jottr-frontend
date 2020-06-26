import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import apiUrl from '../env.js';

import { RiLogoutCircleLine } from "react-icons/ri";

import '../styles/components/LogoBar.scss';

export default function LogoBar(props) {

	const history = useHistory();

	const onClickLogout = (e) => {

		e.stopPropagation();

		axios.post(apiUrl + '/auth/logout')
			.then(res => {
				props.logoutUser();
				history.push('/login');
			})
			.catch(err => console.log(err));
	}

	return (
		<div className="LogoBar">
			<span className="logo"><RiLogoutCircleLine onClick={onClickLogout} /> Jottr</span>
		</div>
	)
}