var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '$2y$10$iQO/dLqZdo4trJ23C5ZDDu1kP2qDfv9hE9fgdaB7ATTv5u2n/n0R2';
module.exports = {
    generateTokenForUser : function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '4h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
            var userId = -1;
            var token = module.exports.parseAuthorization(authorization);
            
            if(token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                  {
                    userId = jwtToken.userId;
                  }
            } catch(err) {}
        }
        return userId;
    }
}
