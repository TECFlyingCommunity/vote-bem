var express = require("express");
var router = express.Router();

const database = require("./../db");
const EleitorModel = require("./../model/eleitor_model");
const CandidatoModel = require("./../model/candidato_model");
const PartidoModel = require("./../model/partido_model");
const AdministradorModel = require("./../model/administrador_model");
const VotoModel = require("./../model/voto_model");

const TIPO_ADM = 2;
const TIPO_CANTIDATO = 1;
const TIPO_ELEITOR = 0;

var eleitor = {
  id:null,
  nome:null,
  email:null,
  senha:null,
  cpf:null,
  titulo:null,
  tipo:null,
};


(async () => {
  try {
    const resultado = await database.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();

/* GET home page. */
router.get("/index", function (req, res, next) {
  if(eleitor.id === null){
    res.redirect("/login");
    return;
  }

  if(eleitor.tipo == TIPO_ADM){
    res.redirect("/dashboard");
  }
  
  res.render("index", { title: "Express" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/login", function (req, res, next) {
  let email = req.body.email;
  let senha = req.body.senha;

  (async () => {
    try {
      const result = await EleitorModel.findAll({
        where: {
          email: email,
          senha: senha,
        },
      });
      
      if(result.length === 0){
        res.redirect("/login");
        return ;
      }
    

      eleitor.id=result[0].dataValues.id;
      eleitor.nome=result[0].dataValues.nome;
      eleitor.email=result[0].dataValues.email;
      eleitor.senha=result[0].dataValues.senha;
      eleitor.cpf=result[0].dataValues.cpf;
      eleitor.titulo=result[0].dataValues.titulo;
      
      res.redirect("/index");
    } catch (error) {
      console.log(error);
      res.render("error", { message: "error" });
    }
  })();
  
});

/* GET Cadastro page. */
router.get("/cadastro", function (req, res, next) {
  res.render("cadastro", { title: "cadastro" });
});

router.post("/cadastro", function (req, res, next) {
  let nome = req.body.nome;
  let email = req.body.email;
  let senha = req.body.senha;
  let cpf = req.body.cpf;
  let titulo = req.body.titulo;

  if (senha == null || !senha) {
    res.render("error", { message: "senha invalida" });
    return;
  }
  if (email == null || !email) {
    res.render("error", { message: "email invalida" });
    return;
  }
  if (nome == null || !nome) {
    res.render("error", { message: "nome invalida" });
    return;
  }
  if (cpf == null || !cpf) {
    res.render("error", { message: "cpf invalida" });
    return;
  }
  if (titulo == null || !titulo) {
    res.render("error", { message: "senha invalida" });
    return;
  }

  console.log(nome, email, senha, cpf);

  (async () => {
    try {
      const result = await EleitorModel.create({
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        titulo: titulo,
      });
      console.log(result);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.render("error", { message: "error" });
    }
  })();
});

/* GET Cadastro dashboard. */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard_home");
});

router.get("/dashboard_eleitor", function (req, res, next) {
  res.render("dashboard_eleitor");
});

/* GET Cadastro Votacao. */
router.get("/consulta_candidato", function (req, res, next) {
  res.render("consulta_candidato");
});

/* GET Cadastro Votar. */
router.get("/votar_candidato", function (req, res, next) {
  res.render("votar_candidato");
});

router.get("/votar", function (req, res, next) {
  if(eleitor.id=null){
    res.redirect("/login");
    return;
  }
  res.render("votar", { title: "dashboard" });
});


/* GET  GRAPHS  */
router.get("/resultados", function (req, res, next) {
  res.render("graphs");
});



module.exports = router;
