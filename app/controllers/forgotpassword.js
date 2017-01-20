import Ember from 'ember';
 const { RSVP: { resolve} } = Ember;

export default Ember.Controller.extend({
  collapsed:true,
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),


  actions:{
    toggle(){
      var controller = this;
      controller.toggleProperty('collapsed');

     controller.get('ajax').raw('/forgotsendotp', {
       method: 'POST',
       data: {
         phone: this.get('phone')
       },

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

    forgotresendotp(){
      var controller = this;

        controller.get('ajax').raw('/forgotsendotp', {
       method: 'POST',
       data: {
         phone: this.get('phone')
       },

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



    forgotauthenticateotp(){
      var controller = this;


       controller.get('ajax').request('/forgotauthenticateotp', {
      method: 'POST',
      data: {
        phone: controller.get('phone'),
        otp: controller.get('otp'),

      },

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

           console.log(controller.get('session.data'));
           controller.transitionToRoute('dashboard');


          // window.location.href = window.location.host ;
          // window.location.reload(true);

      controller.get('notifications').success('OTP confirmed ! , Please Login again', {
        autoClear: true
      });



    },function(error) {
           controller.get('notifications').error( error.payload.message, {
            autoClear: true
         });
       }
     );


    }
  }
});
