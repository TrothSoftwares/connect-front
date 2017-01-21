import Ember from 'ember';
export default Ember.Controller.extend(Ember.Evented,{

session: Ember.inject.service('session'),




  isLoginButtonDisabled: Ember.computed('phone','password', function() {
    if(Ember.isEmpty(this.get('phone')) || Ember.isEmpty(this.get('password'))){
    return true;
    }
    else{
      return false;
    }
  }),

  isSignupButtonDisabled: Ember.computed('newname', 'newphone','newpassword', function() {
    if(Ember.isEmpty(this.get('newname')) || Ember.isEmpty(this.get('newphone')) || Ember.isEmpty(this.get('newpassword'))){
    return true;
    }
    else{
      return false;
    }
  }),

  actions: {
    authenticate(){
      var controller = this;
        this.get('session').authenticate('authenticator:devise', this.get('phone'), this.get('password')).catch(function(){


          controller.get('notifications').error('Phone Number or password is incorrect!', {
            autoClear: true
          });


        });
    },

    signup(){
      var controller = this;
      var newUser = controller.store.createRecord('user',{
        name:this.get('newname'),
        phone:this.get('newphone'),
        password:this.get('newpassword'),
        password_confirmation:this.get('newpassword')
      });


      newUser.save().then(function(){
        controller.get('session').authenticate('authenticator:devise', controller.get('newphone'), controller.get('newpassword')).catch(function(){

          controller.get('notifications').error('Phone Number or password is incorrect!');


        });
      },function(error){
        console.log('getting error');
        console.log(error);
      });



    }

  }
});
