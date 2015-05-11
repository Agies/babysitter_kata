var assert = require("assert");
var sut = require("../src/engines/babysitter-calculator");
describe('Baby sitter calculator', function(){
  it('should have a way to calculate work', function(){
      sut.calculate; 
  });
  it('should have have a calculate function', function(){
    assert.equal(typeof sut, 'object');
    assert.equal(typeof sut.calculate, 'function');
  });
  describe('calculate function', function(){
    it('should require a start time', function(){
      sut.calculate("1");
    });
  })
});