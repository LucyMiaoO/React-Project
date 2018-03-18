var ReactDOM = require('react-dom')
var React = require('react')
var houses = require('./data/housedata.js').allHouses
var _ = require('lodash'); 
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute
var HouseDetail = require('./houseDetail.js' ).HouseDetail ;


var SelectBox = React.createClass({
      handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
            this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
      render: function(){
          return (
            <div className="row">
                <div className="col-md-6 col-md-offset-1">                    
                    <input type="text" className="form-control" placeholder="Search" 
                        value={this.props.filterText}
                        onChange={this.handleTextChange} />
                </div>
                <div className="col-md-1">    
                    Sort by:
                </div>
                <div className="col-md-3">
                    <select id="sort" className="form-control"value={this.props.order } 
                        onChange={this.handleSortChange} >
                        <option value="deposit">Cheapest</option>
                        <option value="city">City</option>                 
                        </select>
                        <br />
                        <br />
                </div>                
            </div>        
               );
          }
       });

var HouseItem= React.createClass({
      render: function(){
          return (  
                <li className="thumbnail house-listing">
                  <Link to={'/houses/' + this.props.houses.id} className="thumb">
                       <img src={this.props.houses.imageUrl} /> </Link>
                  <Link to={'/houses/' + this.props.houses.id}> {this.props.houses.city}</Link>
                  <p>€ {this.props.houses.deposit}</p>
                  <p>{this.props.houses.address}</p>
                </li>  
            ) ;
      }
  });

var FilteredHouseList = React.createClass({
    render: function(){
        var displayedHouses = this.props.houses.map(function(house) {
            return <HouseItem key={house.id} houses={house} /> ;
        }) ;
        return (
                <div className="col-md-12">
                  <ul className="houses">
                      {displayedHouses}
                  </ul>
                </div>
            ) ;
    }
});

var Housepage = React.createClass({
  getInitialState: function() {
       return { search: '', sort: 'type' } ;
  },
  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
  }, 
  render: function(){
       var list = houses.filter(function(p) {
              return p.type.toLowerCase().search(this.state.search.toLowerCase() ) != -1 ;
            }.bind(this) );
      var filteredList = _.sortBy(list, this.state.sort) ;
       return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                  <SelectBox onUserInput={this.handleChange } 
                         filterText={this.state.search} 
                         sort={this.state.sort} />
                   <FilteredHouseList houses={filteredList} />
              </div> 
              </div>                   
            </div>
          
      );
  }
});


exports.Housepage = Housepage ;