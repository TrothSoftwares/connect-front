import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user' ,{async:true}),
  title: DS.attr('string'),
  body: DS.attr('date'),
  createdat: DS.attr('date'),
  });
