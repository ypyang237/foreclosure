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

        it('should create a closure when the function is invoked, and returns the value of the `foreclosed` property of `account`', function() {
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

  describe('borrower()', function() {
    
    describe('returns a literal object that', function() {
      
      var borrower;

      beforeEach(function () {
        var loan = GLOBAL.loan();
        borrower = GLOBAL.borrower(loan);
      });

      describe('has a key named `getFunds`', function() {
        
        it('should be an unnamed function expression', function() {
          borrower.should.have.property('getFunds');
          (typeof borrower.getFunds).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `funds` property of `account`', function() {
          borrower.getFunds().should.equal(2800);
        });

      });

      describe('has a key named `makePayment`', function() {
        
        it('should be an unnamed function expression', function() {
          borrower.should.have.property('makePayment');
          (typeof borrower.makePayment).should.equal('function');
        });

        it('should decrement `account.funds` by the amount defined by loan.getMonthlyPayment() if there are sufficient funds', function() {
          borrower.getFunds().should.equal(2800);
          borrower.makePayment();
          borrower.getFunds().should.equal(1100);
        });

        it('should deplete `account.funds` if funds are less than the amount returned by loan.getMonthlyPayment()', function() {
          borrower.getFunds().should.equal(2800);
          borrower.makePayment();
          borrower.getFunds().should.equal(1100);
          borrower.makePayment();
          borrower.getFunds().should.equal(0);
          borrower.makePayment();
          borrower.getFunds().should.equal(0);
        });

      });

      describe('has a key named `payDay`', function() {
        
        it('should be an unnamed function expression', function() {
          borrower.should.have.property('payDay');
          (typeof borrower.payDay).should.equal('function');
        });

        it('should increment `account.funds` by the amount defined by `account.monthlyIncome`', function() {
          borrower.getFunds().should.equal(2800);
          borrower.payDay();
          borrower.getFunds().should.equal(4150);
        });

      });

    });

  });

  it('should invoke the `loan` function and assign it\'s return value to the `stevesLoan` variable', function() {
    GLOBAL.stevesLoan.should.have.property('getBalance');
    GLOBAL.stevesLoan.should.have.property('receivePayment');
    GLOBAL.stevesLoan.should.have.property('getMonthlyPayment');
    GLOBAL.stevesLoan.should.have.property('isForeclosed');
  });

  it('should invoke the `borrower` function passing in the argument `stevesLoan` and assign it\'s return value to the variabl `steve`', function() {
    GLOBAL.steve.should.have.property('getFunds');
    GLOBAL.steve.should.have.property('makePayment');
    GLOBAL.steve.should.have.property('payDay');
  });

  it('should invoke the `steve.payDay` and `steve.makePayment` functions and increment `month` by `1` while `stevesLoan` is not foreclosed', function() {
    GLOBAL.month.should.equal(13);
    GLOBAL.stevesLoan.getBalance().should.equal(265650);
    GLOBAL.stevesLoan.isForeclosed().should.equal(true);
    GLOBAL.steve.getFunds().should.equal(0);
  });

  describe('monthsUntilEvicted', function () {
    it('should be 13', function() {
      GLOBAL.monthsUntilEvicted.should.equal(13);
    });
  })



});
