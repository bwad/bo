
var app = app || {};

(function ($) {
	'use strict';

  app.MainView = Backbone.View.extend({

    el: '#content',

    tmpl: _.template($('#main-template').html()),

    events: {

    },
    
    initialize: function () {
    },


    render: function () {
      this.$el.empty();
      this.$el.html(this.tmpl());
      return this;
    }
    
  });
})(jQuery);