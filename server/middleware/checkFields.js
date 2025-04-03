// middleware to check if all fields are not empty
function checkFields(req, res, next) {
    // extract the fields
    const fields = req.body;
  
    // get all the values of the fields and store it in an array
    const fieldValues = Object.values(fields);
    
    // loops through each value
    // returns true if all fields are valid
    const hasEmptyField = fieldValues.some( (value) =>
        value === undefined || value === null || (typeof value === 'string' && value.trim() === '')
    );
  
    // error if at least one field is empty
    if (hasEmptyField) {
      return res.status(400).json({ error: 'All fields need to be filled out' });
    }
  
    next();
  }

  module.exports = checkFields;