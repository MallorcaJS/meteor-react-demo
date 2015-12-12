
People = new Mongo.Collection('people');

let Person = React.createClass({
  propTypes:{

    name: React.PropTypes.string,
    changePerson: React.PropTypes.func,

  },

  getInitialState(){
    return {
      editing: false,
    }
  },

  edit(){
     this.setState({
      editing: !this.state.editing
     })
  },

  changeName(event){
    if (event.charCode === 13){
      People.update({_id: this.props.key},{$set:{ name: this.refs.input.value}});
    }


  },

  render(){
    if (this.state.editing){
      return (
          <input ref="input" type="text" defaultValue={this.props.name} onKeyPress={this.changeName}/>
        )
    } else {
      return (
        <li onClick={this.edit}> {this.props.name}</li>
      )
    }
  }
})

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
            this.data.people.map(function(person){
              return (
                <Person key={person._id} name={person.name}/>
                // <li key={name._id}><input type="text" value={name.name} /></li>                  
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