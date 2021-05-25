import React, { useState } from 'react';

const LoginPage = ({ onClickLogin, onClickRegister, error }) => {
	const [details, setDetails] = useState({ email: '', password: '' });

	const loginHandler = () => {
		console.log(details);
		onClickLogin(details);
	};

	return (
		<div className="App-login ">
			<h1 className="h1-login ">Login</h1>

			<div className="App-inputlogin">
				<input
					type="email"
					placeholder="Enter Email"
					onChange={(e) => {
						setDetails({ ...details, email: e.target.value });
					}}
					value={details.email}
					className="App-logininput"
				></input>
			</div>
			<div className="App-inputlogin">
				<input
					type="password"
					placeholder="Enter password"
					onChange={(e) => {
						setDetails({ ...details, password: e.target.value });
					}}
					value={details.password}
					className="App-logininput"
				></input>
			</div>
			<div className="error">
				{error ? 'Wrong email/password or User does not exist' : ''}
			</div>
			<div className="App-buttonlogin">
				<button onClick={loginHandler} className="buttonlogin">
					Login
				</button>
				<button onClick={onClickRegister} className="buttonlogin">
					Sign up
				</button>
			</div>
		</div>
	);
};
export default LoginPage;
