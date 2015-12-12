

let Demo = React.createClass({

  hello(){
    console.log(this.refs.name.value);
  },

  render() {
    return (
      <div>
        <input ref="name"/>
        <button onClick={this.hello}>Ok</button>
      </div>
    )
  }
})


if (Meteor.isClient){
  Meteor.startup(function(){
    ReactDOM.render(<Demo/>, document.querySelector('#demo'));
  });
}