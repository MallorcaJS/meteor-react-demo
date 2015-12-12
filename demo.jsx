
People = new Mongo.Collection('people');

let Person = React.createClass({
  propTypes:{
    person: React.PropTypes.object,
    updatePerson: React.PropTypes.func,
    selectPerson: React.PropTypes.func,
    editing: React.PropTypes.bool
  },

  updatePerson(){
    if (this.refs.name.value.length === 0){
      People.remove({_id: this.props.person._id});
    } else {
      People.update({_id: this.props.person._id},{$set:{ name: this.refs.name.value}});
    }
    this.props.selectPerson(null);
  },

  selectPerson(){
    this.props.selectPerson(this.props.person._id);
  },

  render(){
    if (this.props.editing){
      return (
          // <input ref="input" type="text" className="form-control btn-lg" defaultValue={this.props.name} onKeyPress={this.changeName} autoFocus/>
          <div className="media">
            <div className="media-body">
               <input ref="name" className="col-xs-10  btn-lg"  defaultValue={this.props.person.name} autoFocus/>
               <button onClick={this.updatePerson}  className="col-xs-2 btn btn-primary btn-lg">Update</button>
             </div>
          </div>
        )
    } else {
      return (

        <li onClick={this.selectPerson} className="media">
            <div className="media-body">
              <h3>{this.props.person.name}</h3>
            </div>
        </li>
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
  insertName(event){
    People.insert({name: this.refs.name.value });
    this.refs.name.value = "";
  },

  selectPerson(id){
    this.setState({
      selectedPerson: id ? id : null
    });
  },

  render() {
    console.log(this.data.people);
    return (
        <div className="panel-body">
            <input ref="name" className="col-xs-8 btn-lg" placeholder="Anadir Persona"/>
            <button onClick={this.insertName} className="col-xs-3 col-xs-offset-1 btn btn-success btn-lg">Add</button>
            <div className="clearfix"></div>
            <hr/>
            <h5>{this.data.people.length} people in MallorcaJS</h5>
            <hr/>
            <ul className="media-list">
              {this.data.people.reverse().map((person, index)=>{
                return (
                  <Person selectPerson={this.selectPerson} key={index} person={person} editing={person._id === this.state.selectedPerson} />
                )
              })}
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