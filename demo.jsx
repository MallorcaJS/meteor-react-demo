//Talk about autopublish / pub-sub paradigm in Meteor
People = new Mongo.Collection("People");


var Person = React.createClass({
	propTypes:{
		person: React.PropTypes.object.isRequired
	},
	getInitialState(){
		return {
			editing: false
		}
	},
	personClicked(){
		//State
		this.setState({editing: !this.state.editing});
	},
	keyPressed(event){
		if(event.charCode === 13){
			People.update({_id:this.props.person._id},{$set:{name: this.refs.inputRefPerson.value}});
			this.personClicked();
		}
	},
	render(){
		let html;
		if(this.state.editing){
			html = <input type="text" defaultValue={this.props.person.name} onKeyPress={this.keyPressed} ref="inputRefPerson"/>
			// Mutable Warning with value vs defaultValue
		} else{
			html = <li key={this.props.person._id} onClick={this.personClicked}>{this.props.person.name}</li>
		}
		return html
	}
})

var Demo = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState(){
		return {
			//people: [{name:'Kevin',_id:'1'},{name:'Rafa',_id:'2'}]
		}
	},
	getMeteorData(){
		return {
			// Return all People in collection
			people: People.find({}).fetch()
		}
	},
	insertPerson(){
		let personName = this.refs.inputPersonName;
		// Simple Length Checking
		if(personName.length < 3) return;
		// Insert to Mongo
		People.insert({name:personName.value});
		//Clean INput text
		personName.value = "";
	},
	render(){

		return (
			<div>
				<input type="text" ref="inputPersonName" placeholder="Nombre Persona"/>
				<button onClick={this.insertPerson}>Guardar</button>
				<ul>
					{
						this.data.people.map(
							(person) => {
								return <Person key={person._id} person={person}/>
							}
						)
					}
				</ul>
			</div>
		)
	}

});



//Meteor internal procedure that executes when the App Starts
Meteor.startup( function(){
	if(Meteor.isClient) {
		ReactDOM.render(<Demo/>, document.querySelector("#demo-react-app"));
		// Check Browser Console to read React Warning
	}
});

