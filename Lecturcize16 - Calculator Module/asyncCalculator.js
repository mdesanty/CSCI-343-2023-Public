function add(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a === undefined || b === undefined)
        reject(new Error('Both a and b are required.'));

      if (isNaN(a) || isNaN(b))
        reject(new Error('Both a and b must be numbers.'));

      const sum = parseFloat(a) + parseFloat(b);
      resolve(sum);
    })
  });

  return promise
}

module.exports = { add };