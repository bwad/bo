
var app = app || {};

(function ($) {
	'use strict';

	app.<%= view %>View = Backbone.View.extend({

		el: '<%= el %>',

		tmpl: _.template($('#<%= templateID %>-template').html()),

		events: {

		},
    
		initialize: function () {
		},

		render: function () {
      this.$el.empty();
      this.$el.html(this.tmpl(this.model.toJSON()));
      return this;
		}
    
	});
})(jQuery);
