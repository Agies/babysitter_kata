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
    it('should require a start time AND leave time', function(){
      sut.calculate("17", "17");
    });
    it('should require a start time to be parsable', function(){
      sut.calculate("6:00PM", "1");
    });
    it('should require a start time to be no earlier than 5PM', function(){
      sut.calculate("5:00PM", "1");
    });
    it('should require a leave time to be parsable', function(){
      sut.calculate("6:00PM", "1");
    });
    it('should require a leave time to be no later than 4AM the following day', function(){
      sut.calculate("5:00PM", "4:00");
    }); 
  })
});