import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

function HostSignUp() {
	let navigate = useNavigate();
	const [data, setUser] = useState({
		username: '',
		email: '',
		password: ''
	})
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	let name, value;
	const submitData = async (e) => {
		e.preventDefault();
		setFormErrors(validate(data));
		const dataUser = {
			username: data.username,
			email: data.email,
			password: data.password

		}
		console.log(dataUser);
		const res = await fetch("http://localhost:3000/hostregister", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(dataUser)
		});

		const usr = await res.json();
		console.log("usr status = " + usr.status)
		if (res.status === 422 || !usr) {
			window.alert("Invalid registration");
		}
		else if (res.status === 425) {
			window.alert("Host already exists. Please login!");
			navigate('/hostlogin');
		}
		else {
			window.alert("Registration successful");
			navigate('/hostlogin');
		}

	}

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(data);
		}
	}, [formErrors]);

	const validate = (values) => {
		const errors = {};
		const regex = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})");
		if (!values.username) {
			errors.username = "Username Required";
		}
		if (!values.email) {
			errors.email = "Email Required!";
		}
		if (!regex.test(values.password)) {
			errors.password = "1 Uppercase, Lowercase letter, number and special character required. Minimum length > 6!";
			setIsSubmit(false);
		}
		if (!values.password) {
			errors.password = "Password Required!";
		}
		return errors;
	};

	return (
		<div>
			<div className="d-flex justify-content-center">
				<div className="card" style={{ marginTop: '15px', marginBottom: '15px' }}>
					<div className="card-body">
						<div>
							<h3 className="card-title">Host Sign Up</h3>
							<form>
								<div className="form-inline">
									Name:
									<input id="username"
										className="form-control"
										name="username"
										value={data.username}
										onChange={(e) => {
											name = e.target.name;
											value = e.target.value;
											setUser({ ...data, [name]: value })
										}}
										type="text" /><br />
									<span>{formErrors.username}</span>
								</div>

								<div className="form-inline">
									Email:
									<input id="email"
										className="form-control"
										name="email"
										value={data.email}
										onChange={(e) => {
											name = e.target.name;
											value = e.target.value;
											setUser({ ...data, [name]: value })
										}}
										type="text" /><br />
									<span>{formErrors.email}</span>
								</div>

								<div className="form-inline">

									Password:
									<input id="password"
										className="form-control"
										name="password"
										value={data.password}
										onChange={(e) => {
											name = e.target.name;
											value = e.target.value;
											setUser({ ...data, [name]: value })
										}}
										type="password" /><br />
									<span>{formErrors.password}</span>
								</div>

								<div className="login-button">
									<button className="btn btn-primary" onClick={submitData}>Submit</button>
								</div>
								Already have an account? <Link to="/hostlogin">Login</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}



export default HostSignUp;