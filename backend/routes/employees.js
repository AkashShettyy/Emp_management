const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

// CREATE
router.post('/', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(employee);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
