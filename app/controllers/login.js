import Ember from 'ember';
export default Ember.Controller.extend(Ember.Evented,{

session: Ember.inject.service('session'),



  isLoginButtonDisabled: Ember.computed('email', function() {
    return Ember.isEmpty(this.get('email'));
  }),

  actions: {
    authenticate(){
      var controller = this;
        this.get('session').authenticate('authenticator:devise', this.get('phone'), this.get('password')).catch(function(){


          controller.get('notifications').error('Phone Number or password is incorrect!');


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
        console.log('saved');
      }).catch(function(){
        console.log('error');
      });



    }

  }
});
