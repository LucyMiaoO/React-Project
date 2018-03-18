  var React = require("react");
  var ReactRouter = require('react-router')
  var Router = ReactRouter.Router
  var Route = ReactRouter.Route
  var Link = ReactRouter.Link

  var Signup = React.createClass({

  getInitialState: function(){
    return{
           email: '',
           password: ''
      };
    },

  handleChange:function(signup, event){
    var newState={};
    newState[signup]=event.target.value;
    this.setState(newState);

  },
  handleSubmit:function(e){
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if(!email || !password) {
      alert("please input email or password")
      return;
    }

	var user = this;
	$.ajax({
	  url: "http://localhost:3000/users",
	  type: 'POST',
	  dataType: 'json',
	  data: {
	    email: email,
	    password: password
	},

  success: function(data) {    
    alert("Register successful")
    }.bind(this),
    
  error: function(xhr, status, err) {
       console.error(self.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render : function() {
    return (
      
      <form style={{marginTop: '50px'}}> 
        <h1>Sign up</h1> 
        <div className="container-fluid">
          <div className= "row">
            <div className= "col-md-6 col-md-offset-3">
        			  <div className="form-group">
        			    <label for="exampleInputEmail1">Email address</label>
        			    <input type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Enter email" 
        			    value={this.state.email} onChange={this.handleChange.bind(this,'email')} />
        			  </div>
        			  <div className="form-group">
        			    <label for="exampleInputPassword1">Password</label>
        			    <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password"
        			    value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
        			  </div>
        			  <button type="submit" className="btn btn-primary btn-lg" onClick={this.handleSubmit} value="Signup" >Sign up</button>
  			      </div>
            </div>
          </div>      
      </form>

      );
  }

});

  exports.Signup = Signup; 