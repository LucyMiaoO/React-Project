    var ReactDOM = require('react-dom')
    var React = require('react')
    var api =  require ('./helpAPI').api;
    var _ = require('lodash');
    var CommentView = require('./commentPage.js').CommentView ;
    var ReactRouter = require('react-router')
    var Router = ReactRouter.Router
    var Route = ReactRouter.Route
    var Link = ReactRouter.Link
    var IndexRoute = ReactRouter.IndexRoute

        var Form = React.createClass({
                getInitialState: function() {
                   return { city: '', message: ''};
                },
                addTitle: function(e) {
                    this.setState({city: e.target.value});
                },
                addLink: function(e) {
                    this.setState({message: e.target.value});
                },
                addRecord: function(e){
                    e.preventDefault();
                    var city = this.state.city.trim();
                    var message = this.state.message.trim();
                    if (!city) {
                            return;
                    }
                    this.props.addHandler(city,message);
                    this.setState({city: "",message: ""});
                },
                render : function() {
                     return (
                                <form style={{marginTop: '30px'}}>
                                <div className="container-fluid">
                                  <h3>Add for a house in Ireland:</h3>
                                  <div className="form-group">
                                    <input type="text"
                                      className="form-control" placeholder="City"
                                      value={this.state.city} onChange={this.addTitle} ></input>
                                  </div>
                                  <div className="form-group">
                                    <input type="text"
                                       className="form-control" placeholder="Message"
                                       value={this.state.message} onChange={this.addLink} ></input>
                                  </div>
                                  <button type="submit" className="btn btn-primary" onClick={this.addRecord} >Post</button>
                                </div>
                                </form>         
                      );
                  }
           });

        var HelpItem = React.createClass({
                handleVote : function() {
                     this.props.upvoteHandler(this.props.post.id);
                },
                render : function() {
                    var lineStyle = {
                         fontSize: '20px', marginLeft: '10px'  };
                    var line ;
                    if (this.props.post.message ) {
                       line = <li>{this.props.post.city} - {this.props.post.message} </li> ;
                    } else {
                       line = <span>{this.props.post.city} </span> ;
                    }
                  return (
        
                            <div className="well well-lg">
                                <span className="glyphicon glyphicon-thumbs-up" 
                                    onClick={this.handleVote} ></span>
                                {this.props.post.upvotes}
                                <span style={lineStyle} >{line}<span>
                                    <a href={'#/posts/' + this.props.post.id } className="btn btn-default">Comments</a>
                                  </span>
                                </span>
                            </div>
                         
                  );
                }
           }) ;

           var HelpList = React.createClass({
                render : function() {
                  var items = this.props.posts.map(function(post,index) {
                         return <HelpItem key={index} post={post} 
                                  upvoteHandler={this.props.upvoteHandler}  /> ;
                     }.bind(this) )
                  return (
                    <div>
                          {items}
                          </div>
                    );
                }
           }) ;  

          var Helppage = React.createClass({ 
              incrementUpvote : function(id) {
                   api.upvote(id) ;
                   this.setState({});
              },    
              addPost : function(city,message){
                   api.add(city,message) ;
                   this.setState({});
              }, 
              render: function(){
                  var posts = _.sortBy(api.getAll(), function(post) {
                          return - post.upvotes;
                       }
                    );
                  return (
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-8 col-md-offset-2">
                             <HelpList posts={posts} 
                                  upvoteHandler={this.incrementUpvote} />
                             <Form addHandler={this.addPost}  />
                          </div>   
                        </div>
                      </div>  
                  );
              }
          });

    exports.Helppage = Helppage ;