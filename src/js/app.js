var VoterId = VoterId || {};

(function(V, $){
  var stateDetailModel = new Backbone.Model();

  V.Router = Backbone.Router.extend({
    routes: {
      '': 'reset',
      ':state': 'showDetails'
    },

    reset: function() {
      console.log('reset the view');
    },

    showDetails: function(stateAbbr) {
      var stateConfig = _.find(V.states, function(config){
        return config.abbr === stateAbbr;
      });

      if (stateConfig) {
        $('#state-label').html(stateConfig.name);

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

  var router = new V.Router();
  Backbone.history.start();

  $(function() {
    $('#state').typeahead({source: _.pluck(V.states, 'name') });

    // Ask for the user's location and navigate there
    V.geo.getUserLocation(function () {
      V.geo.reverseGeocode(V.geo.userLocation, function (response) {
        var params = V.geo.parseResp(response[0]);
        router.navigate(params.state, {trigger: true});
      });
    });
  });

  // Bind to the state select form submit event
  $('#state-form').submit(function(evt){
    evt.preventDefault();
    var name = $('#state').val(),
        stateConfig = _.find(V.states, function(config){
          return config.name.toLowerCase() === name.toLowerCase();
        });

    if (stateConfig) {
      router.navigate(stateConfig.abbr, {trigger: true});
    }
  });
  // TODO: Bind state selector
  //       Get the state ABBR
  //       Navigate to the abbr using the router



})(VoterId, jQuery);
