const knex = require("../conexao");

const registrarTarefa = async (req, res) => {
  let { titulo, descricao, completa, categoria, prioridade } = req.body;
  const { id } = req.usuario;  
  titulo = titulo.toLowerCase();
  descricao = descricao.toLowerCase();

  try {

    const tarefaExistente = await knex("tarefas")
      .where("titulo", titulo)
      .andWhere("idUsuario", id) 
      .first();

    if (tarefaExistente) {
      return res.status(400).json({ mensagem: "O título informado já está em uso." });
    }

    const palavrasTitulo = titulo.split(" ");
    const tituloFormatado = palavrasTitulo.filter(palavra => palavra.trim() !== "").join(" ");
    const palavrasDescricao = descricao.split(" ");
    const descricaoFormatada = palavrasDescricao.filter(palavra => palavra.trim() !== "").join(" ");

    const [idTarefa] = await knex("tarefas").insert({
      titulo: tituloFormatado,
      descricao: descricaoFormatada,
      completa: completa || false,
      categoria, 
      prioridade,
      idUsuario: id,  
    });

    const tarefa = await knex("tarefas").where({ id: idTarefa }).first();
    
    res.status(201).json({ mensagem: "Tarefa cadastrada com sucesso!", tarefa });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const editarTarefa = async (req, res) => {
  const { id } = req.params;
  let { titulo, descricao, completa, categoria, prioridade } = req.body;
  const { id: idUsuario } = req.usuario;  

  titulo = titulo.toLowerCase();
  descricao = descricao.toLowerCase();

  try {
    const encontrarTarefa = await knex("tarefas").where({ id }).first();

    if (!encontrarTarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada!" });
    }

    const palavrasTitulo = titulo.split(" ");
    const tituloFormatado = palavrasTitulo.filter(palavra => palavra.trim() !== "").join(" ");
    const palavrasDescricao = descricao.split(" ");
    const descricaoFormatada = palavrasDescricao.filter(palavra => palavra.trim() !== "").join(" ");

    const tarefaExistente = await knex("tarefas")
      .where("titulo", tituloFormatado)
      .count("id as count")
      .first();

    if (tarefaExistente.count > 0 && tituloFormatado !== encontrarTarefa.titulo) {
      return res.status(400).json({ mensagem: "O título informado já está em uso." });
    }

    const updatedCount = await knex("tarefas")
      .where({ id })
      .update({ 
        titulo: tituloFormatado, 
        descricao: descricaoFormatada, 
        completa, 
        categoria,
        prioridade,
        idUsuario 
      });

    if (updatedCount == 0) {
      return res.status(400).json({ mensagem: "A tarefa não foi atualizada!" });
    }

    const tarefaAtualizada = await knex("tarefas").where({ id }).first();
    
    return res.status(200).json({ mensagem: "Tarefa atualizada com sucesso!", tarefaAtualizada });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



const listarTarefas = async (req, res) => {
  try {
    const tarefas = await knex("tarefas");
    res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalharTarefa = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(404).json({ mensagem: "Erro no ID da tarefa. Digite um número válido." });
  }

  try {
    const tarefa = await knex("tarefas").where("id", id).first();

    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada." });
    }

    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletarTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await knex("tarefas").where("id", id).first();
    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada." });
    }

    await knex("tarefas").where("id", id).del();

    return res.status(200).json({ mensagem: "Tarefa excluída com sucesso." });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registrarTarefa,
  editarTarefa,
  listarTarefas,
  detalharTarefa,
  deletarTarefa,
};
