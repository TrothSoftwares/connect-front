import Ember from 'ember';
import {isAjaxError} from 'ember-ajax/errors';

export default Ember.Controller.extend({
  collapsed:true,
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),
  dashboardController: Ember.inject.controller('dashboard'),





  actions:{
    toggle(){
      var controller = this;
      controller.toggleProperty('collapsed');

       controller.get('ajax').raw('/sendotp', {
       method: 'POST',
       data: {
         user_id: this.get('session.data.authenticated.user_id')
       }
     }).then(function(response){
        controller.get('notifications').success( response.payload.message, {
          autoClear: true
        });
      },function(error) {
             controller.get('notifications').error( error.payload.message, {
              autoClear: true
           });

         });


    },


    resendotp(){
      this.get('ajax').raw('/sendotp', {
      method: 'POST',
      data: {
        user_id: this.get('session.data.authenticated.user_id')
      }
    });

    },

    authenticateotp(){
      var controller = this;


       controller.get('ajax').raw('/authenticateotp', {
      method: 'POST',
      data: {
        user_id: controller.get('session.data.authenticated.user_id'),
        otp: controller.get('otp'),

      }
    }).then(function(response){
       controller.get('notifications').success( response.payload.message, {
         autoClear: true
       });
       controller.get('session').invalidate();
       controller.transitionTo('login');
     },function(error) {
            controller.get('notifications').error( error.payload.message, {
             autoClear: true
          });

        });

    }
  }
});
