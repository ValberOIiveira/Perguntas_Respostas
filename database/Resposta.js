const Sequelize = require("sequelize");
const connection = require("./database");


//Criando minha tabela
const Resposta = connection.define("resposta", {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    //Relacionamento de tabelas
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false

    }
});

//Colocando a tabela no banco de dados
Resposta.sync({force: false}).then(() =>{
      
});


//Exportando a tabela
module.exports = Resposta;