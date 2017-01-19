import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';


export default AjaxService.extend({
  session: Ember.inject.service(),
  host: ENV.APP.host,
  // headers: Ember.computed('session.token', {
  //   get() {
  //     let headers = {};
  //     const authToken = this.get('session.token');
  //     if (authToken) {
  //       headers['token'] = authToken;
  //     }
  //     return headers;
  //   }
  // })
});
