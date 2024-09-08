const express = require("express");
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const { login } = require('./controladores/login');
const { registrarUsuario, perfilUsuario, editarUsuario } = require("./controladores/usuarios");
const {editarTarefa, deletarTarefa, registrarTarefa, detalharTarefa, listarTarefas,listarTarefasPorUsuario} = require("./controladores/tarefas");
const validarCorpoRequisicao = require("./intermediarios/validarCorpoReq");
const esquemaTarefa = require("./intermediarios/esquemaTarefa");
const esquemaUsuario = require("./intermediarios/esquemaUsuario");
const esquemaLogin = require("./intermediarios/esquemaLogin");

const rotas = express();

rotas.post("/usuario", validarCorpoRequisicao(esquemaUsuario), registrarUsuario);
rotas.post("/login", validarCorpoRequisicao(esquemaLogin), login);
rotas.use(verificarUsuarioLogado);
rotas.get("/usuario", perfilUsuario);
rotas.put("/usuario", validarCorpoRequisicao(esquemaUsuario), editarUsuario);

rotas.post("/tarefa", validarCorpoRequisicao(esquemaTarefa), registrarTarefa);
rotas.put("/tarefa/:id", validarCorpoRequisicao(esquemaTarefa), editarTarefa);
rotas.get("/tarefa/:id", validarCorpoRequisicao(esquemaTarefa), detalharTarefa);
rotas.get("/tarefas", listarTarefas);
rotas.get("/tarefas/:idUsuario", listarTarefasPorUsuario);
rotas.delete("/tarefa/:id", deletarTarefa);

module.exports = rotas;