var _ = require('lodash');

    var reserves = [
                    {
                        "name": "Lucy Miao",
                        "message": "I want to rent your house.",
                        "phone_number": "353-0877698880"
                    }
                  ] ; 

    var stubAPI = {
          delete : function(k) {
                 var elements = _.remove(reserves, 
                     function(reserve) {
                           return reserve.phone_number == k;
                        }); 
                        },
          getAll : function() {
              return reserves ;
          },
          add : function(n,a,p) {
                 reserves.push({
                     name: n, message : a, phone_number: p }) ;
              },
          update : function(key,n,a,p) {
                   var index = _.findIndex(reserves, function(reserve) {
                        return reserve.phone_number == key;
                      } );      
                   if (index != -1) {
                      reserves.splice(index, 1, {name: n, message: a, phone_number: p});
                    }
              }
          }
          exports.api = stubAPI ;