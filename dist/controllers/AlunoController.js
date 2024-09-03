"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
    async index(req, res) {
        const alunos = await _Aluno2.default.findAll({
            attributes: [
                "id", "nome", "sobrenome",
                "email", "idade", "peso",
                "altura"],
            order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
            include: {
                model: _Foto2.default,
                attributes: ['url', 'originalname', 'filename']
            },
        });

        res.json(alunos);
    }

    async store(req, res) {
        try {
            const aluno = await _Aluno2.default.create(req.body);


            return res.json({
                mgs: 'Aluno cadastrado com sucesso',
                aluno,
                imc: req.body.peso / (req.body.altura ** 2),
            });

        } catch (err) {

            return res.status(400).json({
                errors: err.errors.map(erro => {
                    return erro.message
                }),
            });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Está faltando ID'],
                });
            }
            const aluno = await _Aluno2.default.findByPk(id, {
                attributes: [
                    "id", "nome", "sobrenome",
                    "email", "idade", "peso",
                    "altura"],
                order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
                include: {
                    model: _Foto2.default,
                    attributes: ['url', 'originalname', 'filename']
                },
            });

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe'],
                });
            }
            return res.json({ aluno });


        } catch (err) {

            return res.status(400).json({
                errors: err.errors.map(erro => {
                    return erro.message
                }),
            });
        }


    }
    async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Está faltando ID'],
                });
            }
            const aluno = await _Aluno2.default.findByPk(id);

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe'],
                });
            }

            if (req.body === '') {
                return res.status(401).json({
                    errors: ['Os campos do usuário precisa ser escritos']
                });
            }
            const novoAluno = await aluno.update(req.body);

            return res.json({
                mgs: 'Aluno atualizado com sucesso',
                novoAluno
            });



        } catch (err) {

            return res.status(400).json({
                errors: err.errors.map(erro => {
                    return erro.message
                }),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Está faltando ID'],
                });
            }
            const aluno = await _Aluno2.default.findByPk(id);

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe'],
                });
            }
            await aluno.destroy()

            return res.json({ mgs: 'Aluno apagado com sucesso!' });


        } catch (err) {

            return res.status(400).json({
                errors: err.errors.map(erro => {
                    return erro.message
                }),
            });
        }
    }

}

exports. default = new AlunoController();