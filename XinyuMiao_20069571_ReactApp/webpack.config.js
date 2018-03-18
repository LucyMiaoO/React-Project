	var webpack = require('webpack'); 

	module.exports = { 
	    entry: [ 
	        'webpack/hot/only-dev-server', 
	        './public/app/app.js' 
	    ], 
	    output: { 
	        path: './public/app', 
	        filename: 'bundle.js' 
	    }, 
	    module: { 
	        loaders: [ 
	        { test: /\.js?$/, loaders: ['react-hot-loader', 'babel'], exclude: /node_modules/ }, 
	        { test: /\.js$/, 
			  exclude: /node_modules/, 
			  loader: "babel", 
			   query:
			      {
			        presets:['react']
			      }
			}
	         
	        ] 
	    }, 
	    resolve:{ 
	        extensions:['','.js','.json'] 
	    }, 
	    plugins: [ 
	        new webpack.NoErrorsPlugin() 
	    ] 
	}; 