import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';


export default AjaxService.extend({
  session: Ember.inject.service(),
  host: ENV.APP.host,



});
