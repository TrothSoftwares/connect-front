import Ember from 'ember';
import {isAjaxError, isNotFoundError, isForbiddenError} from 'ember-ajax/errors';

export default Ember.Controller.extend({
  collapsed:true,
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),
  dashboardController: Ember.inject.controller('dashboard'),





  actions:{
    toggle(){
      var controller = this;
      controller.toggleProperty('collapsed');

    //    var response = controller.get('ajax').request('/sendotp', {
    //    method: 'POST',
    //    data: {
    //      user_id: this.get('session.data.authenticated.user_id')
    //    }
    //  });

    //  console.log(response);

    },


    resendotp(){
      this.get('ajax').request('/sendotp', {
      method: 'POST',
      data: {
        user_id: this.get('session.data.authenticated.user_id')
      }
    });

    },

    authenticateotp(){
      var controller = this;


       controller.get('ajax').request('/authenticateotp', {
      method: 'POST',
      data: {
        user_id: controller.get('session.data.authenticated.user_id'),
        otp: controller.get('otp'),

      }
    }).then(function(){
      controller.get('notifications').success('OTP confirmed ! , Please Login again', {
        autoClear: true
      });


      controller.get('session').invalidate();
      controller.transitionTo('login');

      // var dashboardControllerobject = controller.get('dashboardController');
      //
      // dashboardControllerobject.set('otpConfirmed',true);
      // controller.set('session.data.authenticated.otpconfirmed', false);
      //
      // controller.transitionToRoute('dashboard');

    }).catch(function(error) {
        if(isAjaxError(error)) {
          console.log(error.errors[0].title);
          controller.get('notifications').error('OTP is incorrect!', {
            autoClear: true
          });
          return;
        }


        throw error;
      });


    }
  }
});
