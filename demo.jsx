//Meteor internal procedure that executes when the App Starts
Meteor.startup( function(){
	if(Meteor.isClient) {
		ReactDOM.render(<h1>Hello World</h1>, document.body);
		// Check Browser Console to read React Warning
	}
});

