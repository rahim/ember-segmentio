Ember.SegmentioMixin = Ember.Mixin.create({
  pageHasAnalytics: function() {
    return window.analytics && typeof window.analytics === "object";
  },

  logTrackingEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_EVENT_TRACKING;
  },

  logTracking: function() {
    Ember.Logger.info('[Segment.io] ', arguments);
  },

  trackPageView: function(page) {
    if (this.pageHasAnalytics()) {
      if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      analytics.page(page);
    }

    if (this.logTrackingEnabled()) {
      this.logTracking('page view', page);
    }
  },

  trackEvent: function(event, properties, options, callback) {
    if (this.pageHasAnalytics()) {
      analytics.track(event, properties, options, callback);
    }

    if (this.logTrackingEnabled()) {
      this.logTracking(event, properties, options);
    }
  },

  identifyUser: function(userId, traits, options, callback) {
    if (this.pageHasAnalytics()) {
      analytics.identify(userId, traits, options, callback);
    }

    if (this.logTrackingEnabled()) {
      this.logTracking('identify user', traits, options);
    }
  },

  aliasUser: function(userId, previousId, options, callback) {
    if (this.pageHasAnalytics()) {
      analytics.alias(userId, previousId, options, callback)
    }

    if (this.logTrackingEnabled()) {
      this.logTracking('alias user', previousId, options);
    }
  }
});
