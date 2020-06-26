import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

import { BsLockFill } from "react-icons/bs";

import Logo from '../images/logo-white.png';

import apiUrl from '../env.js';

import '../styles/routes/AuthPagesCommon.scss';

export default function Login(props) {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});
	const [inputsVisible, setInputsVisible] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			document.querySelector('input#username').value = '';
			document.querySelector('input#password').value = '';
			setInputsVisible(true);
		}, 500);
	}, []);

	const [formErrors, setFormErrors] = useState();

	const history = useHistory();

	const onChange = (e, field) => {
		const val = e.target.value;
		if (field === 'username') setFormData({ ...formData, username: val });
		if (field === 'password') setFormData({ ...formData, password: val });
	}

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post(apiUrl + '/auth', formData)
			.then(res => {
				props.updateUser({
					_id: res.data._id
				});
				history.push('/');
			}).catch(err => {
				setFormErrors("Incorrect email address or password.");
			});
	}

	return (
		<div className="Login outer">
			<img className="logo-mark" alt="" src={Logo} />
			<div className="content-wrapper" data-inputs-visible={inputsVisible}>
				<h1 className="logo">Jottr</h1>
				<div className="form-container">
					<h1>Login</h1>
					<p>or <Link to="/signup">sign up</Link> here</p>
					<form className="login-form" onSubmit={onSubmit}>
						{formErrors &&
							<div className="error-container">{formErrors}</div>
						}
						<fieldset>
							<label htmlFor="username">Email Address</label>
							<input required id="username" type="email" name="username" value={formData.username} onChange={(e) => onChange(e, 'username')} />
						</fieldset>
						<fieldset>
							<label htmlFor="password">Password</label>
							<input required id="password" type="password" name="password" value={formData.password}  onChange={(e) => onChange(e, 'password')} />
						</fieldset>
						<button type="submit"><BsLockFill /> Login</button>
					</form>
				</div>
			</div>
		</div>
	);
}