var express = require('express');
var router = express.Router();


(async () => {
  const database = require('./../db');
  const Eleitor = require('./../model/eleitor_model');
  const Candidato =  require('./../model/candidato_model');
  const Partido = require('./../model/partido_model');
  const Administrador = require('./../model/administrador_model');
  const Voto = require('./../model/voto_model');

  try {
      const resultado = await database.sync();
      console.log(resultado);
  } catch (error) {
      console.log(error);
  }
})();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
