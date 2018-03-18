var React = require("react");
var Link = require('react-router').Link;

var Sider = React.createClass({
  render : function() {
    return (
      <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li id="logo">IreHouse</li>
                <Link to="/welcome" id="sidemenu"><li>Home</li></Link>
                <Link to="/house" id="sidemenu"><li>Houses</li></Link>
                <Link to="/help" id="sidemenu"><li>Help</li></Link>
                <Link to="/wishlist" id="sidemenu"><li>Wishlist</li></Link>
            </ul>
      </div>

      );
  }
});

 module.exports = Sider; 