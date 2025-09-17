const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  if (typeof password === 'number') {
    password += '';
    return bcrypt.hashSync(password, salt);
  }
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };