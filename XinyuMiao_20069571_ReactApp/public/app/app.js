var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute
var ReactDOM = require('react-dom')
var React = require('react')
var _ = require('lodash');

var Sider = require('./components/sider');

var Signup = require('./components/signup.js').Signup ;

var houses = require('./components/data/houseData.js').allHouses ; 
var Housepage = require('./components/housePage.js' ).Housepage ;
var HouseDetail = require('./components/houseDetail.js' ).HouseDetail ;

var ReservePage = require('./components/reservePage.js').ReservePage ;
var Wishlist = require('./components/wishlistPage.js').Wishlist ;

var Helppage = require('./components/helpPage.js').Helppage ;
var CommentView = require('./components/commentPage.js').CommentView ;


var Welcome = React.createClass({
  render : function() {
    return (
      <div id="top">
        <div id="welcome">
            <div id="welcometext">
              <br />
              <br />
              <form  style={{marginBottom:'30px'}}>
                <div className="row">
                  <div className="col-md-2 col-md-offset-5">
                    <Link to="/signup"><button type="submit" className="btn btn-primary btn-lg">Sign up now!</button></Link>
                  </div>
                </div>    
              </form>
              <br />
            </div>  
        </div>
      </div>

      );
    }
  });

  var App = React.createClass({
    render : function() {
      return (
        <div>
          <Sider />
          <a href="#menu-toggle" id="menu-toggle"><li id="menu">Menu</li></a>       
              {this.props.children}           
        </div>
      )
    }
  });

ReactDOM.render((
  <Router >
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="welcome" component={Welcome} />
      <Route path="signup" component={Signup} />
      <Route path="house" component={Housepage} />       
      <Route path="houses/:id" component={HouseDetail} />
      <Route path="reserve" component={ReservePage} />
      <Route path="wishlist" component={Wishlist} />
      <Route path="help" component={Helppage} />
      <Route path="posts/:postId" component={CommentView} />   
    </Route>   
  </Router>
), document.getElementById('wrapper')) ;

