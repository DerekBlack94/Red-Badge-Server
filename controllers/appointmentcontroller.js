const express = require('express');
const router = express.Router();
const Appointments = require('../models/appointments');

const validateSession = require('../middleware/validateSession');

