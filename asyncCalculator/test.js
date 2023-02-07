const calculator = require('./asyncCalculator');

calculator.add(6, 4)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.add(6, undefined)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.add(6, 'test')
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.subtract(6, 4)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.subtract(6, undefined)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.subtract(6, 'test')
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.multiply(6, 4)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.multiply(6, undefined)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.multiply(6, 'test')
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.divide(6, 4)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.divide(6, undefined)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.divide(6, 'test')
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });

calculator.divide(6, 0)
  .then(result => { console.log(result); })
  .catch(error => { console.log(error); });