var VoterId = VoterId || {};

(function(V, $){
  var stateDetailModel = new Backbone.Model();

  V.Router = Backbone.Router.extend({
    routes: {
      '': 'reset',
      ':state': 'showDetails'
    },

    reset: function() {
      console.log('reset');
    },

    showDetails: function(stateAbbr) {
      console.log('show details for ', stateAbbr);
      var stateConfig = _.find(V.states, function(config){
        return config.abbr === stateAbbr;
      });

      console.log(stateConfig);

      if (stateConfig) {
        $.ajax({
          url: stateConfig.url,
          dataType: 'json',
          success: function(data) {
            stateDetailModel.set(data);
          }
        });
      }
    }
  });

  V.StateDetailView = Backbone.View.extend({
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      console.log('render with this data: ', this.model.toJSON());
      // Get the template and render
      // this.$el.html(ich['detail-template'](this.model.toJSON()));
    }
  });

  var stateDetailView = new V.StateDetailView({
    model: stateDetailModel
  });

  window.app = new V.Router();
  Backbone.history.start();

  // TODO: Ask to get user location
  //       Convert to state abbr
  //       Navigate to the abbr using the router

  // TODO: Bind state selector
  //       Get the state ABBR
  //       Navigate to the abbr using the router



})(VoterId, jQuery);