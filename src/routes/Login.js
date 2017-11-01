import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component{
	state = {
		email: '',
		emailError: '',
		password: '',
		passwordError: ''
	};



	change = (e) => {
		this.props.onChange({ [e.target.name]: e.target.value });
		this.setState({
			[e.target.name]: e.target.value
		});
	};


	validate = () => {
		let isError = false;
		const errors = {
			email: '',
			emailError: '',
			password: '',
			passwordError: ''
		};

		if (this.state.email !== "test@zola.com"){
			isError = true;
			errors.emailError = "Denied";
		}

		if (this.state.email.indexOf("@") === -1){
			isError = true;
			errors.emailError = "Denied";
		}

		if (this.state.password < 9){
			isError = true;
			errors.passwordError = "Denied";
	}

		if (this.state.password !== "zola#frontend") {
			isError = true;
			errors.passwordError = "Denied";
		}

		if (isError){
			this.setState(errors);
		}

		return isError;
	};

	emailValidation = (e) => {
		e.preventDefault();
		const email = this.state.email;
		const err = this.validate();
		const payload = sessionStorage.setItem('email', email);

		if (!err){
			window.location.pathname = "./users";
			return payload;
		}
		return email;
	};

	passwordValidation = (e) => {
		e.preventDefault();
		const password = this.state.password;
		const err = this.validate();
		const payload = sessionStorage.setItem('password', password);

		if (!err){
			window.location.pathname = "./users";
			return payload;
		}


		return password;
	};

	onSubmit = (e) => {
		e.preventDefault();
		const err = this.validate();

		// this.props.onSubmit(this.state);
		// clear fields onSubmit
		if (!err){
			this.setState({
				email: "",
				password: ""
			});
			this.props.onChange({
				email: "",
				password: ""
			});
		}

		return this.emailValidation(e) + this.passwordValidation(e);
	};



	render(){
		return (
			<div className="login_background">
				<h1 className="success-msg">Success</h1>
				<h1 className="email_errorMsg">Denied</h1>
				<h1 className="password_errorMsg">Denied</h1>
				<form action="#" className="form_card">
					<TextField
						name="email"
						hintText="Email"
						floatingLabelText="Zola Email"
						value={this.state.email}
						errorText={this.state.emailError}
						onChange={e => this.change(e)}
						floatingLabelFixed
					/>
					<br/>

					<TextField
						name="password"
						hintText="Password"
						floatingLabelText="Zola Password"
						type="password"
						value={this.state.password}
						errorText={this.state.passwordError}
						onChange={e => this.change(e)}
						floatingLabelFixed
					/>
					<br/>

					<RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
				</form>
			</div>
		);
	}
}

export default Login;
