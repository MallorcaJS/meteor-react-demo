//Talk about autopublish / pub-sub paradigm in Meteor
People = new Mongo.Collection("People");


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
								return <li key={person._id}>{person.name}</li>
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

