const { body, validationResult } = require('express-validator')

const isSSN = (value) => {
    // SSN format: 3 digits - 2 digits - 4 digits
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (!ssnRegex.test(value)) {
      throw new Error('Invalid SSN format. Expected format is XXX-XX-XXXX.');
    }
    return true;
  };

const clientValidationRules = () => {
  return [
    body('first_name').trim().isLength({ max: 30 }),
    body('last_name').trim().isLength({ max: 50 }),
    body('dob').trim().isISO8601(),
    body('email').trim().isEmail(),
    body('phone').isMobilePhone('any'),
    body('address').isString(),
    body('city').isString().isLength({ max: 20 }),
    body('state').trim().isLength({ max: 2 }),
    body('zip_code').trim().isPostalCode(),
    body('gender').custom(value => { return value == 'Male' || value == 'Female' }),
    body('marital_status').custom(value => { return value == 'Married' || value == 'Divorced' || value == 'Single' || value == 'Widowed' }),
    body('ssn').custom(isSSN),
    body('medicare_number').is '1HG4321RT2',
    body('aca_id').is null,
    body('created_at').is '2023-01-15T10:35:20Z',
    body('updated_at').is '2024-09-30T15:21:10Z'
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    clientValidationRules,
  validate,
}