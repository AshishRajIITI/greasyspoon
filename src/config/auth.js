const jwt = require('jsonwebtoken');
const {
    Cafe
} = require('../models/Cafe');
const User = require('../models/User');

async function ensureAuthenticated(req, res, next) {
    // if (req.isAuthenticated()) {
    //     return next();
    // }
    // res.status(401).json({
    //     error: 'Unauthorized'
    // })
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Access denied. No token provided')
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.role == 'User') {
            let workingUser = await User.findOne({
                _id: payload.userId
            })
            if (workingUser) {
                req.user = workingUser
                next();
            } else {
                return res.status(400).json({
                    error: 'No user found'
                })
            }
        } else {
            let workingCafe = await Cafe.findOne({
                _id: payload.userId
            })
            if (workingCafe) {
                req.user = workingCafe
                next();
            } else {
                return res.status(400).json({
                    error: 'No user found'
                })
            }
        }
    } catch (e) {
        res.status(400).json({
            error: e,
        })
    }

}
async function ensureUser(req, res, next) {
    // if (req.isAuthenticated()) {
    //     return next();
    // }
    // res.status(401).json({
    //     error: 'Unauthorized'
    // })
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Access denied. No token provided')
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.role == 'User') {
            let workingUser = await User.findOne({
                _id: payload.userId
            })
            if (workingUser) {
                req.user = workingUser
                next();
            } else {
                return res.status(400).json({
                    error: 'No user found'
                })
            }
        } else {
            return res.status(401).json({
                error: 'Not a user '
            })
        }
    } catch (e) {
        res.status(400).json({
            error: e,
        })
    }

}
async function ensureCafe(req, res, next) {
    // if (req.isAuthenticated()) {
    //     return next();
    // }
    // res.status(401).json({
    //     error: 'Unauthorized'
    // })
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Access denied. No token provided')
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.role == 'Cafe') {
            let workingUser = await User.findOne({
                _id: payload.userId
            })
            if (workingUser) {
                req.user = workingUser
                next();
            } else {
                return res.status(400).json({
                    error: 'No cafe found'
                })
            }
        } else {
            return res.status(401).json({
                error: 'Not a cafe '
            })
        }
    } catch (e) {
        res.status(400).json({
            error: e,
        })
    }

}

module.exports = {
    ensureAuthenticated,
    ensureUser,
    ensureCafe

}