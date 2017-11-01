import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../routes/Login';
import Users from '../routes/Users';
import decode from 'jwt-decode';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const checkAuth = ()=>{
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	if (!token || !refreshToken){
		return false;
	}

	try {
		const { exp } = decode(refreshToken);
		console.log('exp', exp);
		if (exp < new Date().getTime() /1000){
			return false;
		}
	}catch (e){
		console.log('localStorage not set by user');
		return false;
	}

	return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		checkAuth() ? (
			<Component {...props}/>
		) : (
			<Redirect to={{ pathname: '/login'}} />
		)
	)}/>
);

class AuthRoute extends React.Component{

	state = {
		fields: {}
	};

	onChange = updatedValue => {
		this.setState({
			fields: {
				...this.state.fields,
				...updatedValue
			}
		});
	};


	render(){
		return (
			<MuiThemeProvider>
				<BrowserRouter>
					<Switch>
						<Route path="/"  exact render={(props)=><Login onChange={fields => this.onChange(fields)}{...props}/>}/>
						<Route path="/users" exact component={Users}/>
						<PrivateRoute/>
					</Switch>
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}



export default AuthRoute;

