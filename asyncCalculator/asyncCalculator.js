async function add(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      validateOperands(a, b, reject);
      resolve({ result: parseFloat(a) + parseFloat(b) });
    }, 0);
  });

  return promise;
}

async function subtract(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      validateOperands(a, b, reject);
      resolve({ result: parseFloat(a) - parseFloat(b) });
    }, 0);
  });

  return promise;
}

async function multiply(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      validateOperands(a, b, reject);
      resolve({ result: parseFloat(a) * parseFloat(b) });
    }, 0);
  });

  return promise;
}

async function divide(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      validateOperands(a, b, reject);
      if (b == 0)
        reject({ error: 'Can\'t divied by 0.' });

      resolve({ result: parseFloat(a) / parseFloat(b) });
    }, 0);
  });

  return promise;
}

function validateOperands(a, b, reject) {
  if (a === undefined || b === undefined) {
    reject({ error: 'Both a and b are required.' });
  }
  else if (isNaN(a) || isNaN(b)) {
    reject({ error: 'Both a and b must be numbers.' });
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide
};