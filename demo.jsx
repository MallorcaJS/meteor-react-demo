
People = new Mongo.Collection('people');


let Demo = React.createClass({

  // import the meteor data mixin 
  mixins: [ReactMeteorData],

  // fetch data and return it as object
  getMeteorData(){
    return {
      // meteor mongo fetch
      people: People.find().fetch()
    }
  },


  // insertName method
  insertName(){
    console.log(this.refs.name.value);
    People.insert({name: this.refs.name.value });
  },


  render() {
    console.log(this.data.people);
    return (
      <div>
        <input ref="name"/>
        <button onClick={this.insertName}>Ok</button>
        <ul>
          {
            this.data.people.map(function(name){
              return (
                <li key={name._id}>{name.name}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
})


if (Meteor.isClient){
  Meteor.startup(function(){
    ReactDOM.render(<Demo/>, document.querySelector('#demo'));
  });
}