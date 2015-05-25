var vm = require('vm');
var fs = require('fs');
var chai = require('chai')
chai.should();
var expect = chai.expect;

var foreclosure = fs.readFileSync(process.cwd() + '/foreclosure.js', { encoding : 'UTF-8' });
vm.runInThisContext(foreclosure); // file runs and it's contents has access to GLOBAL

describe('foreclosure', function() {

  it('should use strict mode', function() {
    foreclosure.search('\'use strict\';').should.be.above(-1);
  });

  it('should declare a variable named `steve`', function() {
    foreclosure.search('var steve;').should.be.above(-1);
  });

  it('should declare a variable named `stevesLoan`', function() {
    foreclosure.search('var stevesLoan;').should.be.above(-1);
  });

  it('should declare a variable named `month`', function() {
    expect(GLOBAL.month).to.exist;
    (typeof GLOBAL.month).should.equal('number');
  });

  it('should declare a variable named `monthsUntilEvicted`', function() {
    foreclosure.search('var monthsUntilEvicted;').should.be.above(-1);
  });

  it('should declare a function named `loan()`', function() {
    expect(GLOBAL.loan).to.exist;
    (typeof GLOBAL.loan).should.equal('function');
  });

  describe('loan()', function() {
    
    describe('returns a literal object that', function() {
      
      var loan;

      beforeEach(function () {
        loan = GLOBAL.loan();
      });

      describe('has a key named `getBalance`', function() {
        
        it('should be an unnamed function expression', function() {
          loan.should.have.property('getBalance');
          (typeof loan.getBalance).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `balance` property of `account`', function() {
          loan.getBalance().should.equal(286000);
        });

      });

      describe('has a key named `receivePayment`', function() {
        
        it('should be an unnamed function expression', function() {
          loan.should.have.property('receivePayment');
          (typeof loan.receivePayment).should.equal('function');
        });

        it('should conditionally invoke the `missPayment` function', function() {
          // hard to test
        });

        it('should decrement `account.balance` by `amount`', function() {
          loan.receivePayment(2000);
          loan.getBalance().should.equal(284000);
          loan.receivePayment(20000);
          loan.getBalance().should.equal(264000);
        });

      });
      
      describe('has a key named `getMonthlyPayment`', function() {
        
        it('should be an unnamed function expression', function() {
          loan.should.have.property('getMonthlyPayment');
          (typeof loan.getMonthlyPayment).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `monthlyPayment` property of `account`', function() {
          loan.getMonthlyPayment().should.equal(1700);
        });

      });

      describe('has a key named `isForeclosed`', function() {
        
        it('should be an unnamed function expression', function() {
          loan.should.have.property('isForeclosed');
          (typeof loan.isForeclosed).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `monthlyPayment` property of `account`', function() {
          loan.isForeclosed().should.equal(false);
        });

        it('should be true when payments default 5 times', function() {
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(true);
        });

      });

    });

  });

});
