"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
    async store(req, res) {
        try {
            const novoUser = await _User2.default.create(req.body);
            const { nome, email } = novoUser;
            if (novoUser) {
                const sucess = 'User has been created';
                return res.json(
                    { nome, email, mgs: sucess }
                );
            }

        } catch (err) {
            return res.status(400).json({
                errors: err.errors.map(erro => {
                    return erro.message
                }),

            });
        }
    }

    async index(req, res) {
        try {
            const users = await _User2.default.findAll();
            return res.json(users);
        } catch (e) {
            console.log(e);
            res.json(null);
        }
    }
    async show(req, res) {
        try {

            const user = await _User2.default.findByPk(req.userId);
            return res.json(user);
        } catch (e) {
            console.log(e);
            res.json(null);
        }
    }
    async update(req, res) {
        try {
            const user = await _User2.default.findByPk(req.userId);

            if (!user) {
                return res.status(400).json({
                    errors: ['Missing user'],
                });
            }
            const novoDados = await user.update(req.body);
            const { nome, email } = novoDados;
            if (novoDados) {
                const sucess = 'User has been changed';
                return res.status(200).json(
                    { nome, email, mgs: sucess }
                );
            }

        } catch (e) {
            console.log(e);
            res.json(null);
        }
    }

    async delete(req, res) {
        try {

            const user = await _User2.default.findByPk(req.userId);

            if (!user) {
                return res.status(400).json({
                    errors: ['Missing user'],
                });
            }
            await user.destroy();
            return res.json(user);

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(erro => {
                    return erro.message
                }),

            });
        }
    }
}

exports. default = new UserController();