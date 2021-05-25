import React, { useState } from 'react';
import './App.css';
import Wishlist from './Wishlist';
import Login from './loginpage';
import axios from 'axios';
import Register from './Register';

const baseUrl = 'http://localhost:3000/';
const App = () => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoggedOut, setIsLoggedOut] = useState(false);
	const [isRegister, setIsRegistration] = useState(false);
	const [error, setError] = useState(false);

	const handleLogin = ({ email, password }) => {
		axios
			.post(baseUrl + 'login', {
				params: { email: email, password: password },
			})
			.then((response) => {
				console.log(response.data);
				if (response.data !== null) {
					setUser(response.data);
					setIsLogged(true);

					console.log(user);
				} else {
					setIsLogged(false);
					setError(true);
				}
			})
			.catch((err) => console.log(err));
	};
	const handleRegisterLogin = ({ name, email, password }) => {
		const newUserDetail = {
			name: name,
			email: email,
			password: password,
		};

		axios
			.post(baseUrl + 'register', {
				newUserDetail,
			})
			.then((response) => {
				if (response.data !== null) {
					setIsLogged(true);
					setUser({
						email: response.data.email,
						password: response.data.password,
					});
					handleLogin({ email: user.email, password: user.password });
					console.log(response);
				} else {
					setIsLogged(false);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleLogout = () => {
		setIsLogged(false);
		setIsLoggedOut(true);
		setIsRegistration(false);
	};
	const handleRegister = () => {
		setIsRegistration(true);
		setIsLogged(false);
	};
	if (isLogged === true) {
		return (
			<Wishlist
				user={user}
				onClickLogout={handleLogout}
				onClickLogin={handleLogin}
			></Wishlist>
		);
	}
	if (isRegister === true) {
		return (
			<div className="mainlogin">
				<Register
					setIsLogged={setIsLogged}
					user={user}
					setUser={setUser}
					onClickRegisterLogin={handleRegisterLogin}
				/>
				;
			</div>
		);
	}

	return (
		<dvi className="mainlogin">
			{!isLogged && (
				<Login
					onClickLogin={handleLogin}
					onClickRegister={handleRegister}
					error={error}
				/>
			)}
		</dvi>
	);
};

export default App;
