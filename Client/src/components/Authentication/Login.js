import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

	let navigate = useNavigate();
	const [data, setCustomer] = useState({ email: '', password: '' })
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	let name, value;
	const submitData = async (e) => {
		e.preventDefault(); // prevents default form submission and allows JS to handle it
		setFormErrors(validate(data)); // perform error validation
		const dataCustomer = { email: data.email, password: data.password }
		const res = await fetch("http://localhost:3000/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(dataCustomer)
		}); // send post req to endpoint with the dataCustomer data values

		const usr = await res.json();
		if (res.status === 425) {
			window.alert("User doesn't exist. Please SignUp!");
			navigate('/register');
		}
		if (res.status === 420) {
			window.alert("Email or password is incorrect!");
		}
		if (res.status === 200) {
			localStorage.setItem('user', JSON.stringify(usr));
			localStorage.setItem('userLogin', JSON.stringify(data))
			const localstorage_user = JSON.parse(localStorage.getItem('user'))
			console.log(localstorage_user)
			window.alert("Login successful");
			navigate('/');
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
		if (!values.email) {
			errors.email = "Email Required! Format: abc@gmail.com";
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
							<h3 className="card-title">Login</h3>
							<form>
								<div className="form-inline">
									Email:
									<input id="email"
										className="form-control"
										name="email"
										value={data.email}
										onChange={(e) => {
											name = e.target.name;
											value = e.target.value;
											setCustomer({ ...data, [name]: value })
										}} // onChange event gets value entered in email textfield
										// setCustomer hook gets updated with the new data value
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
											setCustomer({ ...data, [name]: value })
										}}
										type="password" /><br />
									<span>{formErrors.password}</span>
								</div>

								<div className="login-button">
									<button type="submit"
										className="btn btn-primary"
										onClick={submitData}>Submit</button>
								</div>
								<Link to="/register"> Don't have an account? </Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}



export default Login;