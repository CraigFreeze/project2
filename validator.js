const { param, body, validationResult } = require('express-validator')

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
        body('zip_code').trim().isLength({ max: 5 }),
        body('gender').custom(value => { return value == 'Male' || value == 'Female' }),
        body('marital_status').custom(value => { return value == 'Married' || value == 'Divorced' || value == 'Single' || value == 'Widowed' }),
        body('ssn').custom(isSSN),
        body('medicare_number').isLength({ max: 50 }),
        body('aca_id').isLength({ max: 20 }),
        body('created_at').isISO8601().withMessage('Date must be in ISO 8601 format'),
        body('updated_at').isISO8601().withMessage('Date must be in ISO 8601 format')
    ]
}

const noteValidationRules = () => {
    return [
        body('agent_id').trim().isLength({ max: 30 }),
        body('client_id').trim().isLength({ max: 30 }),
        body('comment').trim().isLength({ max: 3000 }),
        body('follow_up').trim().isBoolean(),
        body('follow_up_on').isISO8601().withMessage('Date must be in ISO 8601 format')
    ]
}

const mongoIdValidationRules = () => {
    return [
        param('id').isLength({max: 40}) //isLength({ max: 4 })
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    console.log(errors);
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    mongoIdValidationRules,
    clientValidationRules,
    noteValidationRules,
    validate,
}