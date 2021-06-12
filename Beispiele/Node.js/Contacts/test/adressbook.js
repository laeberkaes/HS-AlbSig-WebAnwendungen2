const assert = require('assert');
const { ADDRGETNETWORKPARAMS } = require('dns');
const Adressbook = require('../adressbook');
const Contact = require('../contact');

const dummyContact = new Contact("dummy", "dummy");
describe('An adressbook', function() {
  let adressbook;
  beforeEach(() => {
    adressbook = new Adressbook();
  });

  describe('can add contacts', function() {
    it('should add the contact if the adressbook is empty', function() {
      adressbook.addContact(dummyContact);
    });

    it('should throw an exception if the contact already exists', () => {
      adressbook.addContact(dummyContact);
      assert.throws(() => adressbook.addContact(dummyContact));
    });
  });

  describe('has a assertIsContactObject method', () => {
    it("should not throw on valid Contact objects", () => {
      assert.doesNotThrow(() => adressbook.assertIsContactObject(dummyContact));
    });
    it("should throw on other objects and types", () => {
      assert.throws(() => adressbook.assertIsContactObject(undefined));
      assert.throws(() => adressbook.assertIsContactObject(null));
      assert.throws(() => adressbook.assertIsContactObject("someString"));
      assert.throws(() => adressbook.assertIsContactObject(1));
      assert.throws(() => adressbook.assertIsContactObject({}));
      assert.throws(() => adressbook.assertIsContactObject({"some": "object"}));
      assert.throws(() => adressbook.assertIsContactObject([]));
      assert.throws(() => adressbook.assertIsContactObject([1,2,3,4]));
    })
  });
});
