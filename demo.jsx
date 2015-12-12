
Names = new Mongo.Collection('names');


let Demo = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData(){
    return {
      names: Names.find().fetch()
    }
  },

  hello(){
    console.log(this.refs.name.value);
  },

  render() {
    console.log(this.data.names);
    return (
      <div>
        <input ref="name"/>
        <button onClick={this.hello}>Ok</button>
        <ul>
          {
            this.data.names.map(function(name){
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