import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

session: Ember.inject.service('session'),

  actions: {
    logout() {

      this.get('session').invalidate();
      this.transitionTo('login');
    },


    createPost(){
      var controller = this.get('controller');

      var newpost = controller.store.createRecord('post');

      newpost.save().then(function(success){
        console.log(success);
      },function(error){
        console.log(error);
      });
    }
  }
});
