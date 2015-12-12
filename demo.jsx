
People = new Mongo.Collection('people');

let Person = React.createClass({
  propTypes:{

    name: React.PropTypes.string,
    id: React.PropTypes.string,
    changePerson: React.PropTypes.func,
    selectPerson: React.PropTypes.func,
    editing: React.PropTypes.bool

  },

  changeName(event){
    if (event.charCode === 13){
      People.update({_id: this.props.id},{$set:{ name: this.refs.input.value}});
      this.select();
    }
  },

  clickPerson(event){
    event.preventDefault();
    this.props.selectPerson(this.props.id);
    this.refs.input.value = "";
  },

  render(){
    if (this.props.editing){
      return (
          <input ref="input" type="text" defaultValue={this.props.name} onKeyPress={this.changeName}/>
        )
    } else {
      return (
        <li onClick={this.clickPerson}> {this.props.name}</li>
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

  getInitialState(){
    return {
      selectedPerson: null
    }
  },



  // insertName method
  insertName(){
    console.log(this.refs.name.value);
    People.insert({name: this.refs.name.value });
  },

  selectPerson(id){
    console.log(id);

    this.setState({
      selectedPerson: id
    });

  },

  isEditing(id){
    if ( this.state.editing === id){
      return true;
    } else {
      return false
    }
  },



  render() {
    console.log(this.data.people);
    return (
      <div>
        <input ref="name"/>
        <button onClick={this.insertName}>Ok</button>
        <ul>
          {
            this.data.people.map((person) => {
              return (
                <Person selectPerson={this.selectPerson} key={person._id} id={person._id} name={person.name} editing={person._id === this.state.selectedPerson} />
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