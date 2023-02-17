const Sequelize = require("sequelize");
const connection = require("./database");


//Criando minha tabela
const Pergunta = connection.define("pergunta", {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false

    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Colocando a tabela no banco de dados
Pergunta.sync({force: false}).then(() =>{
      
});


//Exportando a tabela
module.exports = Pergunta;