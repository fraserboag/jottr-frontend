import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import '../styles/routes/Signup.scss';

export default function Signup(props) {

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		password2: ""
	});

	const [formErrors, setFormErrors] = useState();

	const history = useHistory();

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
				history.push('/login');
			})
			.catch(err => setFormErrors(err.response.data));
	}

	return (
		<div className="Signup">
			<form className="signup-form" onSubmit={onSubmit}>
				<div className="error-container">{formErrors}</div>
				<fieldset>
					<label htmlFor="username">Email Address</label>
					<input required id="username" type="email" name="username" value={formData.username} onChange={(e) => onChange(e, 'username')} />
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password</label>
					<input required id="password" type="password" name="password" value={formData.password}  onChange={(e) => onChange(e, 'password')} />
				</fieldset>
				<fieldset>
					<label htmlFor="password2">Repeat Password</label>
					<input required id="password2" type="password" name="password2" value={formData.password2}  onChange={(e) => onChange(e, 'password2')} />
				</fieldset>
				<input type="submit" value="Sign Up" />
			</form>
		</div>
	);
}