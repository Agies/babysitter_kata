var assert = require("assert");
var sut = require("../src/engines/babysitter-time-calculator");
describe('Baby sitter calculator', function(){
  it('should have a way to calculate work', function(){
      sut.calculate; 
  });
  it('should have have a calculate function', function(){
    assert.equal(typeof sut, 'object');
    assert.equal(typeof sut.calculate, 'function');
  });
  describe('calculate function', function(){
    beforeEach(function(done){
      sut.beforeBedtimePayment = 12;
      sut.bedtimeToMidnightPayment = 8;
      sut.afterMidnightPayment = 16;
      done();
    });
    it('should require a start time AND leave time AND bed time', function(){
      sut.calculate("17:00", "17:00", "17:00");
    });
    it('should require a start time', function(){
      assert.throws(function(){
        sut.calculate("", "4:00", "08:00PM");        
      }, /start time required/);
    });
    it('should require a leave time', function(){
      assert.throws(function(){
        sut.calculate("17:00", "", "08:00PM");        
      }, /leave time required/);
    });
    it('should require a bed time', function(){
      assert.throws(function(){
        sut.calculate("17:00", "4:00", "");        
      }, /bed time required/);
    });
    it('should require a start time to be parsable', function(){
      assert.throws(function(){
        sut.calculate("blah", "4:00", "08:00PM");        
      }, /start time must be valid/);
    });
    it('should require a start time to be no earlier than 5PM', function(){
      sut.calculate("5:00PM", "1:00", "8:00PM");
    });
    it('should require a leave time to be parsable', function(){
      assert.throws(function(){
        sut.calculate("5:00PM", "blah", "8:00PM");        
      }, /leave time must be valid/);
    });
    it('should require a leave time to be no later than 4AM the following day', function(){
      sut.calculate("5:00PM", "4:00", "8:00PM");
    });
    it('should require a bed time to be parsable', function(){
      assert.throws(function(){
        sut.calculate("5:00PM", "4:00", "blah");        
      }, /bed time must be valid/);
    });
    it('should pay 36 before bed for 3 hours', function(){
      var amount = sut.calculate("5:00PM", "8:00PM", "8:00PM");
      assert.equal(amount, 36);
    });
    it('should pay 12/hr before bed equaling 48 dollars, if 4 hrs', function(){
      var amount = sut.calculate("5:00PM", "9:00PM", "9:00PM");
      assert.equal(amount, 48);
    }); 
    it('should pay 0 pre-bedtime if start time after bedtime', function(){
      var amount = sut.calculate("11:00PM", "8:00PM", "8:00PM");
      assert.equal(amount, 0);
    }); 
    it('should pay 32 after bed and before midnight, if 4hrs', function(){
      var amount = sut.calculate("11:00PM", "24:00AM", "8:00PM");
      assert.equal(amount, 32);
    }); 
    it('should pay 8/hr after bed and before midnight', function(){
      var amount = sut.calculate("11:00PM", "24:00AM", "7:00PM");
      assert.equal(amount, 40);
    });
    it('should pay 16 after midnight, if 1hr', function(){
      sut.beforeBedtimePayment = 0;
      var amount = sut.calculate("7:00PM", "25:00AM", "24:00AM");
      assert.equal(amount, 16);
    }); 
    it('should pay 16 after midnight, if 1hr', function(){
      sut.beforeBedtimePayment = 0;
      var amount = sut.calculate("7:00PM", "25:00AM", "24:00AM");
      assert.equal(amount, 16);
    });
    it('should pay only for whole hours', function(){
      var amount = sut.calculate("5:15PM", "25:45AM", "8:00PM");
      assert.equal(amount, 72);
    });
  });
});