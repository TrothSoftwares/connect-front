import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  host: ENV.APP.host,
  authorizer: 'authorizer:devise',
 //  handleResponse: function(status, headers, payload){
 //   if(status === 422 && payload.errors){
 //     console.log(payload.errors.message);
 //     return 'dddddddd';
 //    //  return new DS.InvalidError(payload.errors);
 //   }
 //
 //   return this._super(...arguments);
 // }
});
