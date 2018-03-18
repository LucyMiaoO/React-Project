var ReactDOM = require('react-dom');
var React = require('react');
var api =  require ('./reserveAPI').api; 
var buttons = require('./buttonsConfig' ).buttons ;

    var ReserveForm = React.createClass({
       getInitialState : function() {
               return {
                addname: "",
                add_message: "",
                add_phone_number: ""
               } ;
            },
        handlerAdd: function(e){
          e.preventDefault();
          var name = this.state.addname.trim();
          var message = this.state.add_message.trim();
          var phone_number = this.state.add_phone_number.trim();
          if (!name || !message || !phone_number) {
                  return;
          }
          this.props.addHandler(name,message,phone_number);
          this.setState({addname: "",add_message: "",add_phone_number: ""});
        },
        handleNameChange: function(e) {
                this.setState({addname: e.target.value});
        },
        handleMessageChange: function(e) {
           this.setState({add_message: e.target.value});
        },
        handlePhoneNumChange: function(e) {
           this.setState({add_phone_number: e.target.value});
        },
        render: function(){
          return (
            <tr>
              <td key={'addname'}>
              <input type="text" className="form-control" onChange={this.handleNameChange} value={this.state.addname} />
              </td>
              <td key={'add_message'}>
              <input type="text" className="form-control" onChange={this.handleMessageChange} value={this.state.add_message} />
              </td>
              <td key={'add_phone_number'}>
              <input type="text" className="form-control" onChange={this.handlePhoneNumChange} value={this.state.add_phone_number}/>
              </td>
              <td>
              <input type="button" className="btn btn-primary" value="Add" onClick={this.handlerAdd}/>
              </td>
            </tr>
            )
        }
      });

    var Reserve = React.createClass({
      getInitialState : function() {
               return {
                status : '',
                name: this.props.reserves.name,
                message: this.props.reserves.message,
                phone_number: this.props.reserves.phone_number
               } ;
            },
             handleEdit : function() {
                 this.setState({ status : 'edit'} )
            },    
            handleCancel : function() {
                 this.setState({ status : '', 
                         name: this.props.reserves.name,
                         message: this.props.reserves.message,
                         phone_number: this.props.reserves.phone_number} ) ;
            }, 
            handleDelete :function(e) {
              e.preventDefault();
              this.props.deleteHandler(this.props.reserves.phone_number)
              this.setState({status : ''} )
            },
           handleSave : function(e) {
                e.preventDefault();
                var name = this.state.name.trim();
                var message = this.state.message.trim();
                var phone_number = this.state.phone_number.trim();
                if (!name || !message || !phone_number) {
                  return;
                }
                this.props.updateHandler(this.props.reserves.phone_number,
                         name,message,phone_number);
                this.setState({status : ''} )
            }, 
            handleNameChange: function(e) {
                this.setState({name: e.target.value});
            },
            handleMessageChange: function(e) {
               this.setState({message: e.target.value});
            },
            handlePhoneNumChange: function(e) {
               this.setState({phone_number: e.target.value});
            },
          render: function(){
               var activeButtons = buttons.normal ;
               var leftButtonHandler = this.handleEdit ;
               var rightButtonHandler = this.handleDelete ;
               var fields = [
                     <td key={'name'} >{this.props.reserves.name}</td>,
                      <td key={'message'}>{this.props.reserves.message}</td>,
                      <td key={'phone_number'}>{this.props.reserves.phone_number}</td>
                   ] ;
              if (this.state.status == 'edit' ) {
                 activeButtons = buttons.edit ;
                 leftButtonHandler = this.handleSave;
                 rightButtonHandler = this.handleCancel ;
                 fields = [
                    <td key={'name'}><input type="text" className="form-control"
                       value={this.state.name}
                       onChange={this.handleNameChange} /> </td>,
                    <td key={'message'}><input type="text" className="form-control"
                       value={this.state.message}
                       onChange={this.handleMessageChange} /> </td>,
                    <td key={'phone_number'}><input type="text" className="form-control"
                       value={this.state.phone_number}
                       onChange={this.handlePhoneNumChange} /> </td>,
                 ] ;
              }
              return (
                    <tr >
                      {fields}
                      <td>
                          <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                 value={activeButtons.leftButtonVal}
                                 onClick={leftButtonHandler} />
                      </td>
                      <td>
                         <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                               value={activeButtons.rightButtonVal} 
                               onClick={rightButtonHandler} />
                      </td>
                      </tr>
                   ) ;
                }
          });

    var ReserveList = React.createClass({
          render: function(){
               var reserveRows = this.props.reserves.map(function(reserve){
                    return (
                     <Reserve key={reserve.phone_number}  reserves={reserve} 
                        updateHandler={this.props.updateHandler } deleteHandler={this.props.deleteHandler} />
                      ) ;
                  }.bind(this) );
              return (
                  <tbody >
                      {reserveRows}
                      <ReserveForm addHandler={this.props.addHandler} />
                  </tbody>
                ) ;
            }
          });

    var ReservesTable = React.createClass({
          render: function(){
              return (
                <div className="panel panel-default">
                  <div className="panel-heading">Pelease fill in your infromation.</div>
                    <table className="table table-bordered">
                          <thead>
                            <tr>
                            <th>Name</th>
                            <th>Message</th>
                            <th>Phone Number</th>
                            <th></th>
                            <th></th>
                            </tr>
                          </thead>
                          <ReserveList reserves={this.props.reserves} 
                                updateHandler={this.props.updateHandler}  deleteHandler={this.props.deleteHandler} addHandler={this.props.addHandler}/>
                    </table>
                </div>    
                );
          }
      });

       var ReservePage = React.createClass({
          updateReserve : function(key,n,a,p) {
                   api.update(key,n,a,p) ;
                   this.setState({});               
          }, 
          deleteReserve : function(key){
                api.delete(key) ;
                this.setState({});
          },
          addReserve : function(n,a,p){
                api.add(n,a,p) ;
                this.setState({});
          },
          render: function(){
            var reserves = api.getAll() ;
            return (
                  <div className="container-fluid">
                     <h1>Reservstion</h1>
                     <br />
                     <br />
                     <ReservesTable reserves={reserves} 
                        updateHandler={this.updateReserve} deleteHandler={this.deleteReserve} addHandler={this.addReserve} /> 
                  </div>
            );
        }
    });

exports.ReservePage = ReservePage;     