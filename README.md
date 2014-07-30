# Ember Segment.io

An Ember plugin that eases integration between your application and [Segment.io](https://segment.io). This is a close port of [ryanto](https://github.com/ryanto)'s [ember-google-analytics](https://github.com/ryanto/ember-google-analytics).

## Usage

You should include
[ember-segmentio.js](https://github.com/rahim/ember-segmentio/blob/master/ember-segmentio.js) after your main Ember import.

You will also need to include the snippit that Segment.io provide, following [their instructions](https://segment.io/docs/tutorials/quickstart-analytics.js/#step-1-copy-the-snippet).

### Tracking Page Views

Once included your router will automatically send a page view event to
Segment.io everytime the URL changes.

### Tracking Additional Events

You can track custom events with this plugin. If you have a controller
action that you wish to track you can use the
``Ember.SegmentioMixin`` like so:

```javascript
App.VideoController = Ember.Controller.extend(
  Ember.SegmentioMixin, {

  actions: {
    play: function() {
      // ...
      // this.trackEvent(event, properties, options, callback)
      this.trackEvent('Play video');
      // or
      this.trackEvent('Play video', {
        title: 'Never gonna give you up'
      }, {
        integrations: {
          'All': false,
          'Mixpanel': true,
          'KISSMetrics': true
        }
      });
    }
  }
});
```

`trackEvent` has an identical method signature to Segment.io's `analytics.track`, see [their docs](https://segment.io/docs/libraries/analytics.js/#track) for details. (In short: event is mandatory, everything else optional)

The mixin can be applied to any Ember object.

## Logging

To enable console logging any events or page views sent to Segment.io:

```
window.ENV = window.ENV || {};
window.ENV.LOG_EVENT_TRACKING = true;
```

## Development

This plugin is built with rake pipeline, which requires Ruby. To get
started:

```
bundle install
bundle exec rackup
```

Edit code and visit [http://localhost:9292](http://localhost:9292) to
run tests.
