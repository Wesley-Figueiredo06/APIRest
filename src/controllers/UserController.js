import User from "../models/User";

class UserController {
    async store(req, res) {
        try {
            const novoUser = await User.create(req.body);
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
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            console.log(e);
            res.json(null);
        }
    }
    async show(req, res) {
        try {

            const user = await User.findByPk(req.userId);
            return res.json(user);
        } catch (e) {
            console.log(e);
            res.json(null);
        }
    }
    async update(req, res) {
        try {
            const user = await User.findByPk(req.userId);

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

            const user = await User.findByPk(req.userId);

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

export default new UserController();