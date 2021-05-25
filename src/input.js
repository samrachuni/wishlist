import React, { useRef } from 'react';
import './App.css';

const Input = ({ onSubmit, search }) => {
	const [text, setTex] = React.useState('');
	const input = useRef('');

	const keyListner = (e) => {
		if (e.key === 'Enter') {
			console.log('enter is presses');
			console.log(text);
			onSubmit(text);
			setTex('');
		}
	};

	return (
		<div>
			<input
				className="App-input"
				ref={input}
				value={text}
				placeholder="Search..."
				onChange={(e) => {
					setTex(e.target.value);
					search(e.target.value);
				}}
				onKeyDown={keyListner}
				autoFocus
			></input>

			<button
				className="App-button"
				onClick={() => {
					onSubmit(text);
					setTex('');
				}}
			>
				<i className="fa fa-plus fa-3x"></i>
			</button>
		</div>
	);
};
export default Input;
