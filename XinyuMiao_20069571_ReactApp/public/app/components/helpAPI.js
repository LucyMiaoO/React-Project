    var _ = require('lodash');
 

    var posts = [
             {  id: 1 ,
                city : 'Dublin',
                message : 'Ask for a House for 6 people.',
                username : 'jbloggs',
                comments : [],
                upvotes : 8
              },
             { 
                id: 2,
                city : 'Cork',
                message : 'I need a single room.',
                username : 'notme',
                comments : [],
                upvotes : 7
              }
          ] ;


     var stubAPI = {

          getAll : function() {
              return posts ;
              },

          add : function(t,l) {
              var id = 1 ;
              var last = _.last(posts) ;
              if (last) {
                 id = last.id + 1 ;
              }
                  console.log( 'Id =  ' + id);
              posts.push({ 'id': id,  
                       city: t, message : l, username: '', comments: [], upvotes: 0 }) ;

              },

          upvote : function(id) {
                 var index = _.findIndex(posts, function(post) {
                        return post.id == id;
                      } );      
                   if (index != -1) {                 
                      posts[index].upvotes = posts[index].upvotes + 1 ;
                      }
              },

          getPost : function(id) {
                 var result = null ;
                 var index = _.findIndex(posts, function(post) {
                        return post.id == id;
                      } );      
                   if (index != -1) {                 
                      result = posts[index];
                      }
              return result ;
              },

          addComment : function(postId,c,n) {
              post = this.getPost(postId ) ;
              var id = 1 ;
              var last = _.last(post.comments) ;
              if (last) {
                 id = last.id + 1 ;
              }
              post.comments.push({ 'id': id,  
                       comment: c , author: n, upvotes: 0 } ) ;

              },

          upvoteComment : function(postId,commentId) {
              post = this.getPost(postId ) ;
              var index = _.findIndex(post.comments, function(c) {
                        return c.id == commentId;
                      } );      
               if (index != -1) {                 
                   post.comments[index].upvotes += 1 ;
                  }
              } 
                 
      }
    exports.api = stubAPI ;