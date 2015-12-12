var Demo = React.createClass({
	render(){
		return (<h1>Hello World from React Component</h1>)
	}
});


//Meteor internal procedure that executes when the App Starts
Meteor.startup( function(){
	if(Meteor.isClient) {
		ReactDOM.render(<Demo/>, document.querySelector("#demo-react-app"));
		// Check Browser Console to read React Warning
	}
});

