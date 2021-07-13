require('dotenv').config();

const passport = require('passport'),
    jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_PASS, {
        expiresIn: '1y'
    });
}

/**
 * Method used for try to logged the user
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {

        if (err) {
            return res.status(400).json(err);
        }

        if (!user) {
            return res.status(422).json(info);
        }

        return res.status(200).json({
            user: user,
            token: 'JWT ' + generateToken({
                _id: user._id,
                email: user.email
            })
        });

    })(req, res, next);
};
