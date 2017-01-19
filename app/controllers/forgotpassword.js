import Ember from 'ember';
import {isAjaxError} from 'ember-ajax/errors';

export default Ember.Controller.extend({
  collapsed:true,
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),


  actions:{
    toggle(){
      var controller = this;
      controller.toggleProperty('collapsed');

       controller.get('ajax').request('/forgotsendotp', {
       method: 'POST',
       data: {
         phone: this.get('phone')
       }
     });

    //  console.log(response);

    },

    forgotresendotp(){
      var controller = this;
      controller.get('ajax').request('/forgotsendotp', {
      method: 'POST',
      data: {
        phone: this.get('phone')
      }
    });

    },



    forgotauthenticateotp(){
      var controller = this;


       controller.get('ajax').request('/forgotauthenticateotp', {
      method: 'POST',
      data: {
        phone: controller.get('phone'),
        otp: controller.get('otp'),

      }
    }).then(function(){
      controller.get('notifications').success('OTP confirmed ! , Please Login again', {
        autoClear: true
      });




      // controller.get('session').invalidate();
      // controller.transitionTo('login');

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
