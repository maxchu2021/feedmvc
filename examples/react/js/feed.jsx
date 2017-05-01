/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

  app.feed = React.createClass({
	  render: function () {
	    return (
	      <li>
	        <div className="item">
	          <a href={this.props.feed.link}>
	            <div className="cover-outer" style={this.props.feed.cover === null ? {display: 'none'} : null}>
	              <div className="cover" style={{backgroundImage: 'url(' + this.props.feed.cover + ')'}}></div>
	            </div>
	            <div className="title">
	              <h2>{this.props.feed.title}</h2>
	              <div className="description">
	                {this.props.feed.description}
	              </div>
	            </div>
	          </a>
	        </div>
	      </li>
	    );
	  }
	});
})();
