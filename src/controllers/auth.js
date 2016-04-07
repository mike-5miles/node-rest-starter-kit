import jwt from 'jwt-simple'

module.exports = {

  login: function (req, res) {
    const username = req.body.username || ''
    const password = req.body.password || ''

    if (username === '' || password === '') {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      })
      return
    }

    // Fire a query to your DB and check if the credentials are valid
    const dbUserObj = module.exports.validate(username, password)

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401)
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      })
      return
    }

    if (dbUserObj) {
      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(this::genToken(dbUserObj))
    }
  },

  validate: function (username, password) {
    // spoofing the DB response for simplicity
    const dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    }

    return dbUserObj
  },

  validateUser: function (username) {
    // spoofing the DB response for simplicity
    const dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    }

    return dbUserObj
  }

}

// private method
function genToken (user) {
  const expires = this::expiresIn(7) // 7 days
  const token = jwt.encode({
    exp: expires
  }, require('../config/secret')())

  return {
    token: token,
    expires: expires,
    user: user
  }
}

function expiresIn (numDays) {
  const dateObj = new Date()
  return dateObj.setDate(dateObj.getDate() + numDays)
}

