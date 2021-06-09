import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Main';
import Upload from './Upload';
export default function App() {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path='/about'>
						<About />
					</Route>
					<Route path='/upload'>
						<Upload />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						<Main />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Home() {
	return <h2>Home</h2>;
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}
