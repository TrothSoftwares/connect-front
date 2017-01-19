import Ember from 'ember';
import {isAjaxError} from 'ember-ajax/errors';
const { RSVP: { resolve} } = Ember;

export default Ember.Controller.extend({
  collapsed:true,
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),


  actions:{
    toggle(){
      var controller = this;
      controller.toggleProperty('collapsed');

    //    controller.get('ajax').request('/forgotsendotp', {
    //    method: 'POST',
    //    data: {
    //      phone: this.get('phone')
    //    }
    //  });

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
    }).then(function(data){
console.log(data.token);

 controller.get('session').set('data.authenticated.authenticator', "authenticator:devise");
 controller.get('session').set('data.authenticated.token', data.token);
 controller.get('session').set('data.authenticated.user_id', data.user_id);
 controller.get('session').set('data.authenticated.phone', data.phone);
 controller.get('session').set('data.authenticated.otpconfirmed', data.otpconfirmed);
 controller.get('session').set('data.authenticated.resetpassword', true);

 var testObject =  {"authenticated":{"authenticator":"authenticator:devise","user_id":data.user_id,"token":data.token,"phone":data.phone,"otpconfirmed":data.otpconfirmed,"resetpassword":true}};


 localStorage.setItem("ember_simple_auth-session",JSON.stringify(testObject));




          console.log(controller.get('session.data'));

          resolve({ user_token: data.token });
          console.log(controller.get('session.data'));
          controller.transitionToRoute('dashboard');
          window.location.href = window.location.host ;

          window.location.reload(true);


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
