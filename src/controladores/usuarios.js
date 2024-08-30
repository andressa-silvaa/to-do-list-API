const knex = require("../conexao");
const bcrypt = require("bcrypt");

const registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailExistente = await knex("usuarios").where({ email }).first();

    if (emailExistente) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    // Inserir o novo usuário
    const [id] = await knex("usuarios").insert(novoUsuario);

    // Buscar o usuário recém-inserido
    const usuario = await knex("usuarios").where({ id }).first();

    delete usuario.senha;

    return res.status(201).json({ Mensagem: "Usuário cadastrado com sucesso", usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const perfilUsuario = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  try {
    const body = {};

    if (nome) {
      body.nome = nome;
    }
    if (email) {
      if (email !== req.usuario.email) {
        const verificaEmail = await knex("usuarios")
          .where({ email })
          .count("id as count")
          .first();

        if (verificaEmail.count > 0) {
          return res.status(400).json("O email já está cadastrado");
        }
      }
      body.email = email;
    }

    if (senha) {
      body.senha = await bcrypt.hash(senha, 10);
    }

    // Atualizar o usuário
    const updatedCount = await knex("usuarios").where({ id }).update(body);

    if (updatedCount === 0) {
      return res.status(400).json("Não foi possível atualizar o usuário");
    }

    // Buscar o usuário atualizado
    const usuarioAtualizado = await knex("usuarios").where({ id }).first();
    
    delete usuarioAtualizado.senha;
    return res
      .status(200)
      .json({ Mensagem: "Usuário atualizado com sucesso!", usuarioAtualizado });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registrarUsuario,
  perfilUsuario,
  editarUsuario,
};
