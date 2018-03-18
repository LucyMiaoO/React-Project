var ReactDOM = require('react-dom')
var React = require('react')


var Wishlist = React.createClass({

    getInitialState: function() {

      return {
        items: [],
        total: 0,
        currency: 'EUR'
      };
    },

    addItem: function(e, item) {
      this.state.items.push(item);
      this.forceUpdate();
      this.countTotal();
    },

    countTotal: function() {
      var total = 0;

      this.state.items.forEach(function(item, index) {
        total += item.deposit;
      });

      this.setState({
        total: total
      })
    },

    render: function() {
        this.state.items=[localStorage.getItem('houses') ?
                JSON.parse(localStorage.getItem('houses')) : [] ]; 
                window.foo=this.state.items;

        var items = this.state.items.map(function(item) {
            return (
                <ul key={item.id}>
                  <img className="img-thumbnail" width="304px" height="236px" src={item.images[0]} /><br /><br />
                  <span>City: {item.city}</span><br />
                  <span>Deposit: € {item.deposit}</span><br />
                  <span>Address: {item.address}</span>
                </ul> 
            )
        });

        var body = (
          <ul>
            {items}
          </ul>
        );

        var empty = <div className="alert alert-info">Wishlist is empty</div>;
        this.countTotal();

        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-md-offset-1">
                <div className="panel panel-default">
                  <div className="panel-heading">You need to pay: {this.state.total } {this.state.currency}</div>
                    <div className="panel-body">
                      {items.length > 0 ? body : empty}
                    </div>  
                </div>
              </div>
            </div>
          </div>      
        );
    }
});

exports.Wishlist = Wishlist ;