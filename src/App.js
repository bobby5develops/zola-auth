import React, {Component} from 'react';
import Routes from './components/AuthRoute';


class App extends Component{
    render() {
    	return (
			<div className="main_container">
				<div className="main">
					<Routes/>
				</div>
			</div>
		);
	}
}

export default App;
