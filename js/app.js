var VoterId = VoterId || {};

(function(V, $){
  var stateDetailModel = new Backbone.Model();

  V.Router = Backbone.Router.extend({
    routes: {
      ':state': 'showDetails',
      ':state/:target': 'showDetails'
    },

    showDetails: function(stateAbbr, target) {
      var $container = $('body'),
          stateConfig = _.find(V.states, function(config){
            return config.abbr === stateAbbr;
          });

      if (stateConfig) {
        $('#state-label').html("<a href='#" + stateConfig.abbr + "/select'>Select State</a>");
        $('#state-anchor').html("<a id='" + stateConfig.abbr + "/select'></a>");
        _gaq.push(['_trackEvent', 'lookup', stateConfig.abbr]);
        $.ajax({
          url: stateConfig.url,
          dataType: 'json',
          success: function(data) {
            var $scrollTo;
            data.state_config = stateConfig;
            stateDetailModel.set(data);

            if (target) {
              // HACK HACK HACK!!!!
              // Minus 60 pixels due to the padding on the body. There's
              // a better way to do this but I'm sleepy.
              $container.scrollTop($('#'+target).offset().top - 60);
            } else {
              $container.scrollTop(0);
            }
          }
        });
      }
    }
  });

  V.StateDetailLinksView = Backbone.View.extend({
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      var data = this.model.toJSON();
      if (data.state_config.strictness === 'strict_photo') {
        data.strictness = {
          css_class: 'alert-error',
          exclamation: 'Damn it!',
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

      // Get the template and render
      this.$el.html(ich['detail-links-template'](data));
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $(".st_email_large").removeClass("st_email_large");
      }
      stButtons.locateElements();
    }
  });

  V.StateDetailView = Backbone.View.extend({
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      var data = this.model.toJSON();

      data.abbrlower = data.state_config.abbr.toLowerCase();
      data.hotlines = {
        statehotline:   data.state_config.statehotline,
        statedemhotline: data.state_config.statedemhotline,
        stategophotline: data.state_config.stategophotline
      };
      data.statedmv = data.state_config.statedmv;
      // Get the template and render
      this.$el.html(ich['detail-template'](data));
      $(".citationline").each(function () {
        var contents = $(this).html();
        if (contents.length > 30) {
          $(this).attr('title', contents);
          $(this).html(contents.substring(0,27) + "...");
        } 
      });
      $(".citationline").click(function () {
        var temp = $(this).attr('title');
        $(this).attr('title',$(this).html());
        $(this).html(temp);
      });
    }
  });


  var stateDetailView = new V.StateDetailView({
    el: '#voterid-details',
    model: stateDetailModel
  });

  var stateDetailLinksView = new V.StateDetailLinksView({
    el: '#voterid-links',
    model: stateDetailModel
  });

  var router = new V.Router();

  Backbone.history.start();

  $(function() {
    $('#state').typeahead({source: _.pluck(V.states, 'name') });

    // Ask for the user's location and navigate there
    if (!Backbone.history.getHash()) {
      V.geo.getUserLocation(function () {
        V.geo.reverseGeocode(V.geo.userLocation, function (response) {
          var params = V.geo.parseResp(response[0]);
          router.navigate(params.state, {trigger: true});
        });
      });
    }

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
  });
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    $(".st_email_large").each(function () { $(this).removeClass("st_email_large"); });
  }


})(VoterId, jQuery);
