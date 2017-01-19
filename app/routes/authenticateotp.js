import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  ajax: Ember.inject.service(),
  



  setupController: function(controller) {
    controller.set('phone', this.get('session.data.authenticated.phone'));
  },


  actions:{



    authenticateotp(){
      return this.get('ajax').request('/authenticateotp', {
       method: 'POST',
       data: {
         phone: this.get('session.data.authenticated.phone')
       }
     });
    }
  }
});
