"use strict";

var React = require('react');

var NavBar = React.createClass({

    render: function() {

        return (
            <div className="navbar navbar-default navbar-fixed-top">
        	    <div className="container">
        	        <div className="navbar-header">
        	        <div id="navbar" className="navbar-collapse collapse">
                    	<ul className="nav navbar-nav">
                    		<li><a href="survey">Survey</a></li>
                            <li><a href="results">Results</a></li>
                    	</ul>
                  	</div>
        	        </div>
        	    </div>
        	</div>
        );
    }

});

module.exports = NavBar;
