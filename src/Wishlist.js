import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './input';
import axios from 'axios';
import Wish from './wishes';
const baseUrl = 'http://localhost:3000/';

const App = ({ user, onClickLogout }) => {
	const [wish, setWish] = useState([]);
	const [updatedWish, setUpdatedWish] = useState('');
	const [searchedWish, setSearchedWish] = useState(false);

	useEffect(() => {
		/*const result = async () => {
			await axios('http://localhost/3000/whishlist');
			console.log(result.text);
			setWish(result.text);
		};
		result();
	}, []);*/
		if (user.email === 'admin') {
			axios
				.get(baseUrl + 'wishlist')

				.then((response) => {
					setWish(response.data);
				})
				.catch((err) => console.log(err));
		}
		axios
			.get(baseUrl + 'wishlist')

			.then((response) => {
				const person = user.email;

				const filteredWish = response.data
					.filter((wishes) => wishes.user.email === person)
					.reverse();

				setWish(filteredWish);
			})

			.catch((err) => console.log(err));
	}, []);

	const handleUpdateWish = (item) => {
		axios
			.patch(baseUrl + 'wishlist', {
				id: item._id,
				fulfilled: item.fulfilled,
			})
			.then((res) => {
				console.log(res.data.nModified);
				if (res.data.nModified > 0) {
					axios
						.get(baseUrl + 'wishlist')
						.then((response) => {
							if (response.data.email === 'admin') {
								setWish(response.data);
							}
							const updated = response.data
								.filter((wishes) => wishes.user.email === user.email)
								.reverse();
							console.log(updated);
							setWish(updated);
						})
						.catch((err) => console.log(err));
				}
				return item;
			})
			.catch((err) => console.log(err));
		// update state
		// update Db
	};

	const handleCreateWish = (text) => {
		const newWish = {
			text: text,
			_id: new Date().getTime(),
			fulfilled: false,
			user: user,
		};
		axios.post(baseUrl + 'wishlist', { newWish }).then((res) => {
			console.log({ res });
			setWish([res.data, ...wish]);
		});
		// updateDb
		// updateState
	};

	const deleteHandler = (item) => {
		axios
			.delete(baseUrl + 'wishlist', {
				params: { id: item._id },
			})
			.then((res) => {
				console.log(res);
				let updatedWish = wish.filter((el) => el._id !== res.data._id);

				setWish(updatedWish);
			});
	};
	const search = (el) => {
		if (el !== '') {
			setSearchedWish(true);
			const newWWish = wish
				.filter((each) => each.text.includes(el))
				.map((item) => <wish />);
		} else {
			setSearchedWish(false);
		}

		console.log(searchedWish);
	};

	return (
		<div className="App">
			<div>
				<img></img>
				<button onClick={onClickLogout} className="logout-button">
					Log out
				</button>
				<h1 className="App-header">My wish list</h1>
				<Input onSubmit={handleCreateWish} search={search} />
				{wish.map((item) => (
					<Wish
						wish={wish}
						setWish={setWish}
						updatedWish={updatedWish}
						deleteHandler={deleteHandler}
						onWishChange={handleUpdateWish}
						setUpdatedWish={setUpdatedWish}
						item={item}
						key={Math.random() * 100}
						search={search}
						searchedWish={searchedWish}
					></Wish>
				))}{' '}
			</div>
		</div>
	);
};

export default App;
