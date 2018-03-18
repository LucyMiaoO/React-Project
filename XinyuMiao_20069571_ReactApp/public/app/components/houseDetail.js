    var React = require('react')
    var request = require('superagent') ;
    var ReactRouter = require('react-router')
    var Router = ReactRouter.Router
    var Route = ReactRouter.Route
    var Link = ReactRouter.Link
    var Wishlist = require('./wishlistPage.js' ).Wishlist ; 

    var ImagesSection = React.createClass({
          render: function(){
                var thumbImages = this.props.house.images.map(function(img,index) {
                  return (
                        <li>
                           <img key={index} src={img} />
                        </li>
                        ) ;
                    }.bind(this) );
                var mainImage = (
                      <div className="house-images">
                      <img src={this.props.house.images[0]} 
                            className="house" />
                    </div>
                    ) ;
              return (
                  <div>
                       {mainImage}
                       <h1>{this.props.house.city}</h1>
                       <br />
                       <p>{this.props.house.description}</p>
                       <ul className="house-thumbs">
                           {thumbImages}
                       </ul>
                       <br />
                       <div>
                       <Link to="/reserve"><button type="submit" className="btn btn-primary">Reserve</button></Link>
                       </div>
                   </div>
                   );
          }
    });


    var HouseDetail = React.createClass({
          getInitialState: function() {
               return { house: null };
           },
          addToWishlist:function(){
            if(!this.state.added){
               alert("Add to wishlist successfully.");
               localStorage.setItem("houses",JSON.stringify(this.state.house));
              
              }
              else{
                alert("The house has been removed.");
                localStorage.removeItem("houses");
              }
              this.setState({
             added: !this.state.added
           });
           }, 
          CheckOut:function(){
               alert("go to the checkout page"); 
                window.location.href= "/#/wishlist"
           }, 
          componentDidMount: function() {
            request.get(
                 'app/assets/houses/' + this.props.params.id + '.json', function(err, res) {
                     var json = JSON.parse(res.text);
                    if (this.isMounted()) {
                        this.setState({ house : json});
              }
            }.bind(this));
             
          } ,
          render: function(){
              var display = <p>No house details</p> ; 
                var house = this.state.house ;
              if (house) {
                  display =  (
                    <div className="container-fluid">
                        <ImagesSection house={house} />
                        <br />
                        <button className="btn btn-primary" onClick={this.addToWishlist}>
                          Add to wishlist</button>
                    </div>    
                  ) ;
              }
                return (
                    <div className="container-fluid">
                        {display}  
                    </div>
                    );
          }
        });

    exports.HouseDetail = HouseDetail ;