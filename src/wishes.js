import React from 'react';
import './App.css';

const Wish = ({ item, onWishChange, deleteHandler }) => {
	return (
		<div className="App-bodyPart">
			<div className="App-body">
				<li className={`list ${item.fulfilled ? 'fulfilled ' : ' '}`}>
					{item.text}
				</li>

				<div className="button-container">
					<input
						onChange={() => {
							onWishChange({
								...item,
								fulfilled: !item.fulfilled,
							});
						}}
						checked={item.fulfilled}
						type="checkbox"
						className="btn-check"
					></input>
					<button
						className="App-buttonDelete"
						onClick={() => deleteHandler(item)}
					>
						<i className="fa fa-trash fa-2x"></i>
					</button>
				</div>
			</div>
		</div>
	);
};
export default Wish;
