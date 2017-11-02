import React from 'react';
import preload from '../data/data.json';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		cols: 3,
		width: 700,
		height: 550,
		marginTop: 100,
		overflow: 'hidden'


	},

	gridTile: {
		border: '2px solid #000'

	},
	titleStyle: {
		color: '#01b4c0',
		fontWeight: 'bold'
	},
	subtitleStyle: {
		fontSize: 12
	},
	children: {
		color: '#FFF',
	},
	subheader: {
		color: '#01b4c0',
		fontSize: 35,
		paddingLeft: 0,
		paddingTop: 10
	},
	block: {
		maxWidth: 500,
	},
	radioButton: {
		marginBottom: 16,
	},
	menuStyle: {
		selectedTextColor: '#01b4c0'
	}
};



class Users extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.sortList = this.sortList.bind(this);
		this.filterList = this.filterList.bind(this);
		this.state = {
			users: [],
			categories: [],
			value: 1,
			bgColor: ''
		}
	}


	componentWillMount = () => {
		let session = sessionStorage.getItem('password');

		if (session !== 'zola#frontend' || undefined){
			alert('Redirecting user to login page');
			window.location.pathname = '/';
		}

		let users = preload.data;
		this.setState({
			users: users
		});

		let categories = [];
		users.map((user) => {
			if (categories.indexOf(user.category) === -1) {
				categories.push(user.category)
			}
			return null
		});

		this.setState({categories: categories});

	};


	handleChange = (event, index, value) => {
		this.sortList(value);
		let users = this.state.users;
		this.setState({users: users});
	};

	sortList = (value)=> {
		this.setState({value});
		let users = this.state.users;

		if (value === 1){
			window.location.pathname = '/users';
		}

		if (value === 2){
			users.sort(function (a,z) {
				let firstLetter = a.name;
				let lastLetter = z.name;

				if (firstLetter < lastLetter){
					return -1;
				}
				if (firstLetter > lastLetter){
					return 1;
				}
				return 0;
			})
		}else if (value === 3){
			users.sort(function (a,z) {
				let firstLetter = a.name;
				let lastLetter = z.name;

				if (firstLetter > lastLetter){
					return -1;
				}
				if (firstLetter < lastLetter){
					return 1;
				}
				return 0;
			})
		}else if (value === 4){
			users.sort(function (first, last) {
				let firstNum = first.priority;
				let lastNum = last.priority;

				if (firstNum < lastNum){
					return -1;
				}
				if (firstNum > lastNum){
					return 1;
				}
				return 0;
			}).map(function (x) {
				let iterator = x.priority;

				if (iterator === 1){

					//styles.gridTile.backgroundColor = "orange";
				}else if (iterator === 2){

				}else if (iterator === 3){

				}else if (iterator === 4){

				}
				return iterator;
			});
		}
		return value;
	};
	filterList = (value) => {
		this.setState({value});
	};




	//create a show function
	//create a hide function

	render(){
		return (
			<div style={styles.root}>
				<div>
					<Toolbar>
						<ToolbarGroup firstChild={true}>
							{/*sort grid alphanumerically A-Z / Z-A */}
							<DropDownMenu value={this.state.value} onChange={this.handleChange}>
								<MenuItem value={1} primaryText="Featured" />
								<MenuItem value={2} primaryText="A-Z" />
								<MenuItem value={3} primaryText="Z-A" />
								<MenuItem value={4} primaryText="Priority" />
							</DropDownMenu>
						</ToolbarGroup>
						<ToolbarSeparator />
						<ToolbarGroup>
							{/*filter grid based on categories*/}
							<RadioButtonGroup value={this.state.value} onChange={this.filterList} labelPosition="left" defaultSelected={"opt1"}>
								{this.state.categories.map((cat, i)=>{
									return (<RadioButton
										value={cat}
										label={i}
										checkedIcon={<ActionFavorite style={{color: '#01b4c0'}} />}
										uncheckedIcon={<ActionFavoriteBorder />}
										style={styles.radioButton}
									/>)
								})}
							</RadioButtonGroup>
						</ToolbarGroup>
					</Toolbar>
				</div>

				<GridList cellHeight="auto" style={styles.gridList} cols={3.0}>
					{this.state.users.map((user, i) => (
						<GridTile style={styles.gridTile} className="grid_tile"
							key={i}
							title={user.name}
							titleStyle={styles.titleStyle}
							subtitle={<span>Age: {user.age}</span>}
							subtitleStyle={styles.subtitleStyle}
							children={<span style={styles.children}>Cat: {(user.category)}</span>}
							child={user.priority}
							actionIcon={<IconButton><ActionFavoriteBorder color="white"/></IconButton>}>
								<span className="background"></span>
						</GridTile>
					))}
				</GridList>
			</div>)
	}
}

export default Users;