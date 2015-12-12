//Talk about autopublish / pub-sub paradigm in Meteor
//People = new Mongo.Collection("People");


var Demo = React.createClass({
	getInitialState(){
		return {
			people: [{name:'Kevin',_id:'1'},{name:'Rafa',_id:'2'}]
		}
	},
	render(){

		return (
			<div>
				<input type="text"/>
				<button>Hola</button>
				<ul>
					{
						this.state.people.map(
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

