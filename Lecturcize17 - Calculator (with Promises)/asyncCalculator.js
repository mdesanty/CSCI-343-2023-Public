async function add(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      validateOperands(a, b, reject);
      resolve(parseFloat(a) + parseFloat(b));
    }, 0);
  });

  return promise;
}

async function subtract(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      validateOperands(a, b, reject);
      resolve(parseFloat(a) - parseFloat(b));
    }, 0);
  });

  return promise;
}

async function sum(num) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      if (num === undefined)
        reject(new Error('The num param is required.'));

      const nums = (num instanceof Array ? nums : [num]);
      const sum = nums.map(i => {
        if (isNaN(i))
          reject(new Error('All num values must be numbers.'));

        return parseFloat(i);
      }).reduce((sum, i) => sum + i, 0);

      console.log(sum);
      resolve(sum);
    }, 0);
  });

  return promise;
}

function validateOperands(a, b, reject) {
  if (a === undefined || b === undefined)
    reject(new Error('Both a and b are required.'));

  if (isNaN(a) || isNaN(b))
    reject(new Error('Both a and b must be numbers.'));
}

module.exports = {
  add,
  subtract,
  sum
};