import React from 'react';
import preload from '../data/data.json';
import {GridList, GridTile} from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import RaisedButton from 'material-ui/RaisedButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';

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
		overflowY: 'auto',


	},
	gridTile: {

	},
	titleStyle: {
		color: 'rgb(0, 188, 212)',
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
};



class Users extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: [],
			categories: [],
			valueSingle: "3",
			valueMultiple: ['3', '5'],
			value: 3
		}
	}

	handleChange = (event, index, value) => this.setState({value});
	handleChangeSingle = (event, value) => {
		this.setState({
			valueSingle: value,
		});
	};


	componentWillMount(){
		let users = preload.data;
		console.log(users);
		this.setState({
			users: users
		});
		let categories = [];
		console.log(categories);
		users.map((user) => {
			console.log(user.category);
			if (categories.indexOf(user.category) === -1) {
				categories.push(user.category)
			}
			return null
		});
		this.setState({categories: categories})

	}



	render(){
		return (
			<div style={styles.root}>
				<div>
					<Toolbar>
						<ToolbarGroup firstChild={true}>
							<DropDownMenu value={this.state.value} onChange={this.handleChange}>
								<MenuItem value={1} primaryText="All Users" />
								<MenuItem value={2} primaryText="A-Z" />
								<MenuItem value={3} primaryText="Z-A" />
							</DropDownMenu>
						</ToolbarGroup>
						<ToolbarGroup>
							<RadioButtonGroup  labelPosition="left" style={styles.block}>
								<RadioButton
									value="opt1"
									label="opt1"
									checkedIcon={<ActionFavorite style={{color: '#01b4c0'}} />}
									uncheckedIcon={<ActionFavoriteBorder />}
									style={styles.radioButton}
								/>
							</RadioButtonGroup>
						</ToolbarGroup>
						<ToolbarGroup>
							<RadioButtonGroup>
								<RadioButton
									value="opt2"
									label="opt2"
									checkedIcon={<ActionFavorite style={{color: '#01b4c0'}} />}
									uncheckedIcon={<ActionFavoriteBorder />}
									style={styles.radioButton}
								/>
							</RadioButtonGroup>
						</ToolbarGroup>
						<ToolbarGroup>
							<RadioButtonGroup>
								<RadioButton
									value="opt3"
									label="opt3"
									checkedIcon={<ActionFavorite style={{color: '#01b4c0'}} />}
									uncheckedIcon={<ActionFavoriteBorder />}
									style={styles.radioButton}/>
							</RadioButtonGroup>
						</ToolbarGroup>
					</Toolbar>
				</div>
				<GridList cellHeight="auto" style={styles.gridList} cols={3.0}>
					{this.state.users.map((user, i) => (
						<GridTile
							key={i}
							title={user.name}
							subtitle={<span>Age: {user.age}</span>}
							category={<span>Category: {user.category}</span>}
							actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
							titleStyle={styles.titleStyle}



						>


						</GridTile>
					))}
				</GridList>
			</div>)
	}
}

export default Users;