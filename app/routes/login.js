import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin,{

  setupController:function(controller){
    if(Ember.isEqual(true, this.get('session.data.authenticated.resetpassword'))){
      window.location.reload(true);
    }
  }
});
