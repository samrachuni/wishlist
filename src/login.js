import React from 'react';

import LoginPage from './loginpage.js';

const Login = ({ onClickLogin, onClickRegister, error }) => {
	return (
		<div>
			<LoginPage
				onClickLogin={onClickLogin}
				onClickRegister={onClickRegister}
				error={error}
			/>
		</div>
	);
};
export default Login;
