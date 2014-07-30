Ember.FEATURES["ember-testing-lazy-routing"] = true;

App = Ember.Application.create({ rootElement: '#qunit-fixture' });

App.Router.map(function() {
  this.route('welcome');
});

App.setupForTesting();

module("Routing", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  },

  teardown: function() {
    window.analytics = null;
  }
});

test("should not do anything when there is no analytics reference present", function() {
  visit("/");

  visit("/welcome");

  andThen(function() {
    ok(!window.analytics);
  });
});

test("should not do anything if window.analytics is not an object", function() {
  window.analytics = 1;

  visit("/");

  visit("/welcome");

  andThen(function() {
    ok(window.analytics);
  });
});

test("should trigger when a route changes", function() {
  var counter = 0;

  window.analytics = {
    page: function() {
      counter = counter + 1;
    }
  };

  visit("/");

  andThen(function() {
    equal(counter, 1);
  });

  visit("/welcome");

  andThen(function() {
    equal(counter, 2);
  });
});

test("should send the current url to segmentio", function() {
  window.analytics = {
    page: function(title) {
      equal(title, "/welcome");
    }
  };

  visit("/welcome");
});
