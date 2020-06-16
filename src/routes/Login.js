import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import '../styles/routes/Login.scss';

export default function Login(props) {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});

	const [formErrors, setFormErrors] = useState();

	const history = useHistory();

	const onChange = (e, field) => {
		const val = e.target.value;
		if (field === 'username') setFormData({ ...formData, username: val });
		if (field === 'password') setFormData({ ...formData, password: val });
	}

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post('http://localhost:5000/auth', formData)
			.then(res => {
				props.updateUser({
					_id: res.data._id
				});
				history.push('/');
			}).catch(err => setFormErrors(err.response.data));
	}

	return (
		<div className="Login">
			<form className="login-form" onSubmit={onSubmit}>
				<div className="error-container">{formErrors}</div>
				<fieldset>
					<label htmlFor="username">Email Address</label>
					<input required id="username" type="email" name="username" value={formData.username} onChange={(e) => onChange(e, 'username')} />
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password</label>
					<input required id="password" type="password" name="password" value={formData.password}  onChange={(e) => onChange(e, 'password')} />
				</fieldset>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}