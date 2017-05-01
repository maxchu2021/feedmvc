/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

  app.item = React.createClass({
	  render: function () {
			var getFeed = function () {
				this.props.getFeed(this.props.item.name, this.props.item.url)
			};

	    return (
	      <li>
	        <a className="feed" onClick={getFeed.bind(this)}>{this.props.item.name}</a>
	        <button className="delete-feed">x</button>
	      </li>
	    );
	  }
	});
})();
