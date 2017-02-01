import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-places-autocomplete', 'Integration | Component | my places autocomplete', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{my-places-autocomplete}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#my-places-autocomplete}}
      template block text
    {{/my-places-autocomplete}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
