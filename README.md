# Foreclosure

## Closure Exercise

Fork and clone this project.  
Open the `foreclosure.js` file in your editor.  
Run `gulp watch` to auto-run tests.  
Follow the instructions below, and every time you see this symbol ![Test][test-large] an additional test should pass.

### Strict Mode

Use strict mode for this exercise. ![Test][test]  

### Initialize variables

1. Declare a variable named steve. ![Test][test]  
1. Declare a variable named stevesLoan. ![Test][test]  
1. Declare a variable named month, with an initial value of 0. ![Test][test]
1. Declare a variable named monthsUntilEvicted. ![Test][test]  

### loan()

Declare a function named `loan()` that takes `0` arguments ![Test][test]  

Write the following statements inside the `loan()` function block

1. Declare a variable named `account`, with an initial value being a literal object having the following properties and values:
  - key : `borrowed`, value : `550000`
  - key : `balance`, value : `286000`,
  - key : `monthlyPayment`, value : `1700`,
  - key : `defaulted`, value : `0`,
  - key : `defaultsToForeclose`, value : `5`,
  - key : `foreclosed`, value : `false`
1. Declare a function named `missPayment` that takes `0` arguments.
  - Access the `defaulted` property of the `account` variable and increase it's value by `1`.
  - Write a conditional that, when the value of `account.defaulted` is greater than or equal to `account.defaultsToForeclose`, will run the following statement:
    - set the value of the `foreclosed` property of the `account` object to `true`
1. return a literal object with the following properties:
  - key : `getBalance`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `balance` by accessing that property of the locally scoped variable `account`. ![Test][test]
  - key : `receivePayment`, value : an unnamed function expression that takes `1` argument named `amount`. ![Test][test]
    - Create a conditional statement that will run the following statements when `amount` is less than `account.monthlyPayment` :
      - invoke the `missPayment` function with `0` arguments
    - Finally, decrement the value of the `balance` property of the `account` variable, by the value of the `amount` parameter. ![Test][test]
  - key : `getMonthlyPayment`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `monthlyPayment` by accessing that property of the locally scoped variable `account`. ![Test][test]
  - key : `isForeclosed`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `foreclosed` by accessing that property of the locally scoped variable `account`. ![Test][test]



## License

Copyright (c) 2015 Dev League. Licensed under the MIT license.


[test-large]: http://i.imgur.com/TOUBxO4.png
[test]: http://i.imgur.com/XLSydy0.png
