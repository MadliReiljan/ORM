const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

const models = require('../models')

//get all data from table
const getAllArticles = (req, res) => {
    models.Article.findAll({
    })
    .then(articles => {
        return res.status(200).render('index', {articles});
    })
    .catch (error => {
        return res.status(500).send(error.message);
    })
}

//show article by this slug
const getArticleBySlug = (req, res) => {
    models.Article.findOne({
        where: {
            slug : req.params.slug
        },
        include: [
            {
            model: models.Author
            },
            {
                model: models.Tag,
                through: {
                    model: models.ArticleTag
                }
            }
    ],
    })
    .then(article => {
        return res.status(200).render('article', {article});
    })
    .catch (error => {
        return res.status(500).send(error.message);
    })
}

module.exports = {
    getAllArticles,
    getArticleBySlug
};