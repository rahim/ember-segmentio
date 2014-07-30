Ember.SegmentioMixin = Ember.Mixin.create({
  pageHasAnalytics: function() {
    return window.analytics && typeof window.analytics === "object";
  },

  logTrackingEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_EVENT_TRACKING;
  },

  logTracking: function() {
    Ember.Logger.info('Tracking Segmentio.io event: ', arguments);
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
      this.logTracking('pageview', page);
    }
  },

  trackEvent: function(event, properties, options, callback) {
    if (this.pageHasAnalytics()) {
      analytics.event(event, properties, options, callback);
    }

    if (this.logTrackingEnabled()) {
      this.logTracking(event, properties, options, callback);
    }
  }
});
