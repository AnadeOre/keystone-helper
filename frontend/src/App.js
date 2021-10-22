import { useState } from "react";
import { MainScreen } from "./Components/MainScreen";
import { Summary } from "./Components/Summary";
import { Switch, Router, Route, useHistory } from "react-router";
function App() {
	const [link, setLink] = useState(null);
	const [dataRecieved, setDataRecieved] = useState(null);
	const history = useHistory();

	const handleChange = (e) => {
		setLink(e.target.value);
	};

	async function fetchApi(code) {
		try {
			let res = await fetch(`http://localhost:3001/api/${code}`);
			let responseIsOK = res && res.ok;
			if (responseIsOK) {
				let data = await res.json();
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSubmit(e) {
		console.log("submitting");
		let code;
		if (link.length > 16) {
			code = link.substring(link.length - 16);
			console.log(code);
		} else {
			code = link;
			console.log(code);
		}
		const dataFromAPI = await fetchApi(code);
		if (!dataFromAPI.error) {
			setDataRecieved(dataFromAPI);
			history.push(`summary`);
		}
	}

	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route exact path='/'>
						<MainScreen
							onCodeWriting={handleChange}
							onCodeSubmit={handleSubmit}
						/>
					</Route>
					<Route exact path='/summary'>
						<Summary props={dataRecieved} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
