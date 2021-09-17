var express = require("express");
var router = express.Router();

const database = require("./../db");
const EleitorModel = require("./../model/eleitor_model");
const CandidatoModel = require("./../model/candidato_model");
const PartidoModel = require("./../model/partido_model");
const AdministradorModel = require("./../model/administrador_model");
const VotoModel = require("./../model/voto_model");

const TIPO_ADM = 2;
const TIPO_CANDIDATO = 1;
const TIPO_ELEITOR = 0;

var eleitor = {
  id: null,
  nome: null,
  email: null,
  senha: null,
  cpf: null,
  titulo: null,
  tipo: null,
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
router.get(["/index", "/"], function (req, res, next) {
  if (eleitor.id === null) {
    res.redirect("/login");
    return;
  }

  if (eleitor.tipo == TIPO_ADM) {
    res.redirect("/dashboard");
    return;
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

      if (result.length === 0) {
        res.redirect("/login");
        return;
      }


      eleitor.id = result[0].dataValues.id;
      eleitor.nome = result[0].dataValues.nome;
      eleitor.email = result[0].dataValues.email;
      eleitor.senha = result[0].dataValues.senha;
      eleitor.cpf = result[0].dataValues.cpf;
      eleitor.titulo = result[0].dataValues.titulo;
      eleitor.tipo = result[0].dataValues.tipo;



      if (eleitor.tipo == TIPO_ADM) {
        res.redirect("/dashboard");
        return;
      }
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

  if (senha === null || !senha) {
    res.render("error", { message: "senha invalida" });
    return;
  }
  if (email == null || !email) {
    res.render("error", { message: "email invalida" });
    return;
  }
  if (nome === null || !nome) {
    res.render("error", { message: "nome invalida" });
    return;
  }
  if (cpf === null || !cpf) {
    res.render("error", { message: "cpf invalida" });
    return;
  }
  if (titulo === null || !titulo) {
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
        tipo: TIPO_ELEITOR,
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
  if (eleitor.id === null) {
    res.redirect("/login");
    return;
  }
  (async () => {
    let liste = await CandidatoModel.findAll();

    res.render("dashboard_home", { candidatos: liste });
    return;
  })();

});

router.get("/dashboard_eleitor", function (req, res, next) {
  if (eleitor.id === null) {
    res.redirect("/login");
    return;
  }

  (async () => {
    let liste = await EleitorModel.findAll();

    res.render("dashboard_eleitor", { eleitores: liste });

    return;
  })();


});


router.post("/cadastro_candidato", function (req, res, next) {

  let cpf = req.body.cpf;
  let numero = req.body.numero;
  let partido = req.body.partido;
  var idEleitor = 0;
  console.log(cpf);
  if (cpf == null || !cpf) {
    res.render("error", { message: "cpf invalida" });
    return;
  }

  if (numero === null || !numero) {
    res.render("error", { message: "numero invalida" });
    return;
  }

  if (partido === null || !partido) {
    res.render("error", { message: "partido invalida" });
    return;
  }

  (async () => {
    let eleitorResult = await EleitorModel.findAll({
      where: {
        cpf: cpf,
      }
    });

    console.log(eleitorResult.length != 0)
    if (eleitorResult.length != 0) {
      idEleitor = eleitorResult[0].dataValues.id;
    }

    if (idEleitor === 0) {
      res.render("error", { message: "cpf do eleitor invalida" });
      return;
    }
    console.log(idEleitor);
    console.log(eleitorResult);

    let result = await CandidatoModel.create({
      id: idEleitor,
      numVoto: numero,
    });
    console.log(result);


  })();


  (async () => {

  })();
  res.redirect("/dashboard")
});



router.get("/finalizar_voto/:idcandidato", function (req, res, next) {
  const idCandidato = req.params.idcandidato;

  console.log(idCandidato);

  if (idCandidato === 0) {
    res.render("error", { message: "Canditato invalido" });
    return;
  }
  console.log(eleitor.id);
  if (eleitor.id === null) {
    res.render("error", { message: "nenhum usuario logado" });
    return;
  }



  (async () => {
    try {
      await VotoModel.create({
        idEleitor: eleitor.id,
        idCandidato: idCandidato,
      });

      res.redirect("/index");
    } catch (error) {
      console.log(error);


      res.render("error", { message: "Você não pode votar 2 vezes" });

    }
  })();


});

router.get("/votar", function (req, res, next) {
  if (eleitor.id === null) {
    res.redirect("/login");
    return;
  }
  res.render("consultar_candidato");
});

router.post("/votar", function (req, res, next) {

  let numero = req.body.candidato;


  (async () => {

    try {

      let resultCandidato = await CandidatoModel.findAll({

        where: {
          numVoto: numero,
        }
      });

      let resultCandidatoInfo = await EleitorModel.findAll(
        {
          where: {
            id: resultCandidato[0].dataValues.id,
          }
        }
      );

      res.render("votar_candidato", { candidato: resultCandidato[0].dataValues, info: resultCandidatoInfo[0].dataValues });
    } catch (error) {
      console.log(error);


      res.render("error", { message: "numero invalida" });
    }

  })();


});


/* GET  GRAPHS  */
router.get("/resultados", function (req, res, next) {

  (async () => {
    let resultCandidatos = await CandidatoModel.findAll();

    // console.log(resultCandidatos);
    var listaNumero = [];
    var listaVoto = [];

    for(let index in resultCandidatos){
      console.log(resultCandidatos[index]);


      let count = await VotoModel.count({
        where: {
          idCandidato: resultCandidatos[index].dataValues.id,
        }
      });

      console.log(count);
      listaNumero.push(resultCandidatos[index].dataValues.numVoto);
      listaVoto.push(count);


      console.log(listaNumero);
      console.log(listaVoto);
     

    }
    res.render("graphs", { numeros: listaNumero, votos: listaVoto });



  })();

});


/* GET LOGOUT */
router.get("/logout", function (req, res, next) {
  eleitor.id = null;
  res.redirect("/login");

});

/* GET INDEX */

router.get("/index", function (req, res, next) {
  res.redirect("/index");

});



module.exports = router;
