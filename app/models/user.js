import DS from 'ember-data';

export default DS.Model.extend({

  name:DS.attr('string'),
  phone:DS.attr('string'),
  password:DS.attr('string'),
  password_confirmation:DS.attr('string'),
  otpconfirmed:DS.attr('boolean'),
  posts: DS.hasMany('post' ,{embedded: 'always', async:true}),

});
