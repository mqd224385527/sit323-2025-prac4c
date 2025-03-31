const express = require('express');
const app = express();
const port = 3000;
const validateNumbers = (req, res, next) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) { 
    return res.status(400).json({
      error: "wrong input！please provide useful number（such as num1=5&num2=3）。"
    });
  }
  req.nums = { num1, num2 };
  next();
};
app.get('/add', validateNumbers, (req, res) => {
  const { num1, num2 } = req.nums;
  res.json({ result: num1 + num2 });
});
app.get('/subtract', validateNumbers, (req, res) => {
  const { num1, num2 } = req.nums;
  res.json({ result: num1 - num2 });
});
app.get('/multiply', validateNumbers, (req, res) => {
  const { num1, num2 } = req.nums;
  res.json({ result: num1 * num2 });
});
app.get('/divide', validateNumbers, (req, res) => {
  const { num1, num2 } = req.nums;
  if (num2 === 0) {
    return res.status(400).json({ error: "num2 can not be 0！" });
  }
  res.json({ result: num1 / num2 });
});
app.get('/power', validateNumbers, (req, res) => {
    const { num1: base, num2: exponent } = req.nums;
    res.json({ result: Math.pow(base, exponent) });
  });
const validateSingleNumber = (req, res, next) => {
    const num = parseFloat(req.query.num);
    if (isNaN(num)) {
      return res.status(400).json({ error: "wrong input！please provide useful number（such as num=16）。" });
    }
    req.num = num;
    next();
  };
    app.get('/sqrt', validateSingleNumber, (req, res) => {
    const num = req.num;
    if (num < 0) {
      return res.status(400).json({ error: "number can't under 0" });
    }
    res.json({ result: Math.sqrt(num) });
  });
  app.get('/modulo', validateNumbers, (req, res) => {
    const { num1, num2 } = req.nums;
    if (num2 === 0) {
      return res.status(400).json({ error: "num2 can't be 0！" });
    }
    res.json({ result: num1 % num2 });
  });
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});