import React from "react";
import "../Styles/MainScreen.css";

export const MainScreen = (props) => {
	const performSubmit = (e) => {
		e.preventDefault();
		props.onCodeSubmit(e);
	};

	const performChange = (e) => {
		e.preventDefault();
		props.onCodeWriting(e);
	};

	console.log("in main");
	return (
		<div className='form-container'>
			<form onSubmit={performSubmit}>
				<label> Insert WarcraftLogs report code: </label>
				<input type='text' onChange={performChange} />
				<button>Analyze!</button>
			</form>
		</div>
	);
};
