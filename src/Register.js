import React, { useState } from 'react';

const Registrationpage = ({
	setIsLogged,
	user,
	setUser,
	onClickRegisterLogin,
}) => {
	const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
	/* useEffect(() => {
		axios
			.get(baseUrl + 'login')
			.then((response) => setUser(response.data))
			.catch((err) => console.log(err));
	}, []); */
	const handleCreatUser = () => {
		console.log(newUser);
		onClickRegisterLogin(newUser);
		/* console.log(newUser);
		const newUserDetail = {
			name: newUser.name,
			email: newUser.email,
			password: newUser.password,
		};
		axios
			.post(baseUrl + 'register', { newUserDetail })

			.then((response) => {
				setUser({
					email: response.data.email,
					password: response.data.password,
				});
				setIsLogged(true);
				onClickLogin(user);
				console.log(user); 
			})
			.catch((err) => console.log(err));*/
	};
	return (
		<div className="App-register">
			<h1 className="h1-register">Create Account</h1>
			<div className="App-registerInput">
				<input
					type="text"
					placeholder="Enter Name"
					onChange={(e) => {
						setNewUser({ ...newUser, name: e.target.value });
						console.log(newUser.name);
					}}
					value={newUser.name}
					className="register-input"
				></input>

				<input
					type="email"
					placeholder="Enter Email"
					onChange={(e) => {
						setNewUser({ ...newUser, email: e.target.value });
					}}
					value={newUser.email}
					className="register-input"
				></input>

				<input
					type="password"
					placeholder="Enter password"
					onChange={(e) => {
						setNewUser({ ...newUser, password: e.target.value });
					}}
					value={newUser.password}
					className="register-input"
				></input>

				<button onClick={handleCreatUser} className="register-button">
					Sign up
				</button>
			</div>
		</div>
	);
};
export default Registrationpage;
