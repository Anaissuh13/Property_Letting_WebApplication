//file created to fix the login issue in admin page
const bcrypt = require('bcryptjs')
console.log(bcrypt.hashSync('coobirds',10))
