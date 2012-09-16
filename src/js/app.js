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
            data.state_config = stateConfig;
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

      var data = this.model.toJSON();

      if (data.state_config.strictness === 'strict_photo') {
        data.strictness = {
          css_class: 'alert-error',
          exclamation: 'Damn it.',
          message: 'The Voter ID law is very strict for this election. Very specific photo IDs are required! Keep reading...'
        };
      } else if (data.state_config.strictness === 'photo') {
        data.strictness = {
          css_class: '',
          exclamation: 'Heads up!',
          message: 'A photo ID is required to vote in this election. Keep reading to learn the requirements.'
        };

      } else if (data.state_config.strictness === 'non_photo') {
        data.strictness = {
          css_class: '',
          exclamation: 'Not too bad.',
          message: 'You need an ID to vote in this election, but not a photo ID. Keep reading to learn the requirements.'
        };
      } else {
        data.strictness = {
          css_class: 'alert-success',
          exclamation: 'Sweet!',
          message: 'No Voter ID law is in effect for this election.'
        };
      }
      data.abbrlower = data.state_config.abbr.toLowerCase();
      data.hotlines = {
        statehotline:   data.state_config.statehotline,
        statedemhotline: data.state_config.statedemhotline,
        stategophotline: data.state_config.stategophotline
      };
      // Get the template and render
      var html = ich['detail-template'](data);
      this.$el.html(html);
    }
  });

  var stateDetailView = new V.StateDetailView({
    el: '#voterid-details',
    model: stateDetailModel
  });

  var router = new V.Router();

  Backbone.history.start({pushState: true, root: window.location.pathname});

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
})(VoterId, jQuery);
