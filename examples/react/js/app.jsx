/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
	'use strict';

	var Item = app.item;
	var Feed = app.feed;

	var FeedApp = React.createClass({
		getInitialState: function() {
			return {
				feedTitle: '',
				items: [{
						name: 'TechCrunch',
						url: 'http://feeds.feedburner.com/TechCrunch/'
					}, {
						name: 'Gamespot',
						url: 'http://www.gamespot.com/feeds/news/'
					}],
				feeds: [],
				newItemName: '',
				newItemUrl: ''
			};
		},

		componentDidMount: function() {
			this.getFeed('Gamespot', 'http://www.gamespot.com/feeds/news/');
		},

		getFeed: function(name, url) {
			var self = this;
			fetch('../../server/get_feed.php?url=' + url)
				.then(function(response) {
					return response.json();
				})
				.then(function(response) {
					self.setState({
						feedTitle: name,
						feeds: response
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		handleChange: function (event) {
			this.setState({[event.target.name]: event.target.value});
		},

		addItem: function () {
			var name = this.state.newItemName;
			var url = this.state.newItemUrl;
			this.getFeed(name, url);
			this.setState({
				newItemName: '',
				newItemUrl: ''
			});
		},

		render: function () {
			var self = this;
			var feedTitle = this.state.feedTitle;
			var items = this.state.items.map(function (item) {
				return (
					<Item
						key={item.name}
						item={item}
						getFeed={self.getFeed}
					/>
				);
			});

			var feeds = this.state.feeds.map(function (feed) {
				return (
					<Feed
						key={feed.title}
						feed={feed}
					/>
				);
			});

			return (
			  <div id="wrapper" className="feedapp">

			    <header>
			      <div className="mobile-menu">
			        <button className="lines-button x">
			          <span className="lines"></span>
			        </button>
			      </div>
			    </header>

			    <nav>
			      <ul className="menu">
			        {items}
			      </ul>
			      <hr />
			      <ul className="add-form">
			        <li><a className="add-feed-button">Add Feed</a></li>
			        <li>
		            <input
									name="newItemName"
									value={this.state.newItemName}
									placeholder="Name" onChange={this.handleChange} />
		            <input
									name="newItemUrl"
									value={this.state.newItemUrl}
									placeholder="RSS feed URL"
									onChange={this.handleChange} />
		            <button
									onClick={this.addItem}>
									Add
								</button>
			        </li>
			        <li><a href="https://github.com/keanyc/feed/tree/master/react">Source</a></li>
			      </ul>
			    </nav>

			    <div className="items">
			      <h3>{feedTitle}</h3>
			      <ul>
							{feeds}
			      </ul>
			    </div>

			  </div>
			);
		}
	});

	function render() {
		React.render(
			<FeedApp />,
			document.getElementsByClassName('feedapp')[0]
		);
	}

	// model.subscribe(render);
	render();
})();
