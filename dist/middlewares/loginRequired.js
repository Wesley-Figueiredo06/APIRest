"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
exports. default = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            errors: ['Login required'],
        });
    }

    const [, token] = authorization.split(' ');

    try {
        const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = data;

        const user = await _Userjs2.default.findOne({
            where: {
                id,
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                errors: ['User invalid or token changed.'],
            });
        }

        req.userId = id;
        req.userEmail = email;
        return next();

    } catch (e) {
        return res.status(401).json({
            errors: ['Invalid or token expired '],
        });
    }

}