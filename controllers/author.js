const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/orm');
const models = require('../models')
    
const getAuthorById = (req,res) => {
    models.Author.findByPk(req.params.id, {
        include: {
            model: models.Article,
            as: 'articles'
        }
    })
    .then(article => {
        console.log(article)
        return res.status(200).json({article});
    })
    .catch (error => {
        return res.status(500).send(error.message);
    })
    
}
module.exports = {
    getAuthorById
}