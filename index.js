//Importando e iniciando o express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Importando o database
const connection = require('./database/database');
//Importando tabelas do banco de dados
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');



connection.authenticate()
.then(() => {
    console.log();
})
.catch((msgErro) => {
    console.log(msgErro);
});


//Importando o ejs
app.set('view engine', 'ejs');


//Importando o body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Alocando arquivos estáticos
app.use(express.static('public'));


//Criando uma rota e usandor o render para trazer o HTML
app.get("/", function(req, res) {
    //Listando toas as perguntas na página principal
    //SELECT * FROM perguntas;
    //Listando todas as perguntas pelo id
    Pergunta.findAll({raw: true, order : [
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index.ejs",{
            perguntas: perguntas
        });
        });
});

//Criando rota de perguntas
app.get("/perguntar",function(req,res) {
    res.render("perguntas.ejs")
});


//Criando rota para editar perguntas
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;

    Pergunta.findOne({

        where:{ id: id }

    }).then(pergunta => {
        if(pergunta != undefined){//Achou uma pergunta
            Resposta.findAll({
                where:{ perguntaId: pergunta.id },
                order: [
                    ["id", "DESC"]
                ]
            }).then(respostas => {
                res.render("pergunta.ejs",{
                    pergunta: pergunta,
                    respostas: respostas
                              
                });
            })
            
        }else{//Nao achou uma pergunta

            res.redirect("/");

        }
    });


});

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

//Criando rota para salvar perguntas
app.post("/salvarpergunta",function(req,res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
     
    //INSERT INTO
    Pergunta.create({
        //Como deixei no ejs
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //Redirecionando para a pagina principal
        res.redirect("/");
    });
});


//Criando a porta
app.listen(8080,() => {
    
});

