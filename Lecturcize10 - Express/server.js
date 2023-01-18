require("dotenv").config();

const express = require("express");

const app = express();

/**
 * Express routing: https://expressjs.com/en/guide/routing.html
 */
app.get("/add", handleAdd);
app.get("/subtract", handleSubtract);
app.get("/sum", handleSum);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function handleAdd(req, res) {
  try {
    if (req.query.a === undefined || req.query.b === undefined)
      throw Error("Both a and b are required.");

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (isNaN(a) || isNaN(b))
      throw Error("Both a and b must be numbers.");

    const sum = a + b;

    writeResponse(res, 200, { result: sum });
  }
  catch (e) {
    console.log(e.message);
    writeResponse(res, 400, { error: e.message });
  }
}

function handleSubtract(req, res) {
  try {
    if (req.query.a === undefined || req.query.b === undefined)
      throw Error("Both a and b are required.");

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (isNaN(a) || isNaN(b))
      throw Error("Both a and b must be numbers.");

    const difference = a - b;

    writeResponse(res, 200, { result: difference });
  }
  catch (e) {
    console.log(e.message);
    writeResponse(res, 400, { error: e.message });
  }
}

function handleSum(req, res) {
  try {
    if (req.query.num === undefined)
      throw Error("At leaset two numbers are required.");

    const nums = (req.query.num instanceof Array ? req.query.num : [req.query.num]);

    /**
     * Map and Reduce.
     */
    const sum = nums.map((value) => {
      const number = parseInt(value);

      if (isNaN(number))
        throw Error("All num values must be numbers.");

      return number;
    })
    .reduce((total, current) => { return total + current; }, 0);

    writeResponse(res, 200, { result: sum });
  }
  catch (e) {
    console.log(e.message);
    writeResponse(res, 400, { error: e.message });
  }
}

function writeResponse(res, status, object) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(JSON.stringify(object));
}