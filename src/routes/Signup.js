import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import { BsLockFill } from "react-icons/bs";

import Logo from '../images/logo-white.png';

import '../styles/routes/AuthPagesCommon.scss';
import '../styles/routes/Signup.scss';

export default function Signup(props) {

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		password2: ""
	});
	const [formErrors, setFormErrors] = useState();
	const [inputsVisible, setInputsVisible] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			document.querySelector('input#username').value = '';
			document.querySelector('input#password').value = '';
			setInputsVisible(true);
		}, 500);
	}, []);

	const onChange = (e, field) => {
		const val = e.target.value;
		if (field === 'username') setFormData({ ...formData, username: val });
		if (field === 'password') setFormData({ ...formData, password: val });
		if (field === 'password2') setFormData({ ...formData, password2: val });
	}

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post('http://localhost:5000/auth/signup', formData)
			.then(res => {
				console.log(res);
				setShowSuccess(true);
			})
			.catch(err => setFormErrors(err.response.data));
	}

	return (
		<div className="Signup outer">
			<img className="logo-mark" alt="" src={Logo} />
			<div className="content-wrapper" data-inputs-visible={inputsVisible}>
				<h1 className="logo">Jottr</h1>
				<div className="form-container">
					<h1>Create an Account</h1>
					<p>or <Link to="/login">login</Link> here</p>

					{!showSuccess ?

						<form className="signup-form" onSubmit={onSubmit}>
							{formErrors &&
								<div className="error-container">{formErrors}</div>
							}
							<fieldset>
								<label htmlFor="username">Email Address</label>
								<input required id="username" type="email" name="username" value={formData.username} onChange={(e) => onChange(e, 'username')} />
							</fieldset>
							<fieldset>
								<label htmlFor="password">Password</label>
								<input required id="password" type="password" name="password" value={formData.password} onChange={(e) => onChange(e, 'password')} />
							</fieldset>
							<fieldset>
								<label htmlFor="password2">Repeat Password</label>
								<input required id="password2" type="password" name="password2" value={formData.password2} onChange={(e) => onChange(e, 'password2')} />
							</fieldset>
							<button type="submit"><BsLockFill /> Sign Up</button>
						</form>

						:

						<div className="success-message">Thanks for creating an account, you can now <Link to="/login">login</Link> and start using Jottr immediately.</div>

					}
				</div>
			</div>
		</div>
	);
}