import Aluno from "../models/Aluno";
import Foto from "../models/Foto";

class AlunoController {
    async index(req, res) {
        const alunos = await Aluno.findAll({
            attributes: [
                "id", "nome", "sobrenome",
                "email", "idade", "peso",
                "altura"],
            order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
            include: {
                model: Foto,
                attributes: ['url', 'originalname', 'filename']
            },
        });

        res.json(alunos);
    }

    async store(req, res) {
        try {
            const aluno = await Aluno.create(req.body);


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
            const aluno = await Aluno.findByPk(id, {
                attributes: [
                    "id", "nome", "sobrenome",
                    "email", "idade", "peso",
                    "altura"],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                include: {
                    model: Foto,
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
            const aluno = await Aluno.findByPk(id);

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
            const aluno = await Aluno.findByPk(id);

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

export default new AlunoController();