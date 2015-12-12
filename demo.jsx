var Demo = React.createClass({
	render(){

		return (
			<div>
				<input type="text"/>
				<button>Hola</button>
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

