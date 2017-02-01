import Ember from 'ember';

export default Ember.Controller.extend({
session: Ember.inject.service('session'),

restriction: {country: "in"},


  isCreatePostButtonDisabled: Ember.computed('place', 'needsprovides', 'lookingfor', function() {
    if(Ember.isEmpty(this.get('place')) || Ember.isEmpty(this.get('needsprovides')) || Ember.isEmpty(this.get('lookingfor'))){
    return true;
    }
    else{
      return false;
    }
  }),



  actions:{







    focusOut(){

    },


    placeChanged(place){
  //     this.set('placeJSON', JSON.stringify(place, undefined, 2));
  // if (place.adr_address) {
  //   let regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
  //       fullAddress = place.adr_address.replace(regexp, "$2");
  //   this.set('cleanFullAddress', fullAddress);
  //   console.log("Getting full addrees");
  //   console.log(fullAddress);
  // }
  // console.log("Getting place addr_addrees");
  // console.log(place.adr_address);
  // this.set('fullAddress', place.adr_address);
  //
  //
  //     console.log(location);
  //     console.log("placechanged");



    
    },
    createPost(){
      var controller = this;
      var user = controller.get('store').findRecord('user', controller.get('session.data.authenticated.user_id'));


user.then(function(user){



  var posttitle = "#"+controller.get('place') + "#"+controller.get("needsprovides") + "#"+controller.get("lookingfor");

  var newpost = controller.store.createRecord('post',{
    user: user,
    title: posttitle,
  });


  newpost.save().then(function(){
    controller.set('place','');
    controller.set('needsprovides','');
    controller.set('lookingfor','');
  },function(error){
    console.log(error);
  });

});

    },
  }
});
