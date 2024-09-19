const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

const models = require('../../models')

const createArticle = (req, res) => {
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body
    let author_id = req.body.author_id

    const newArticle = models.Article.create({
        name: name,
        slug: slug,
        image: image,
        body: body,
        author_id: author_id,
        
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
    .then(article => {
        console.log(article)
        return res.status(200).json({ message: 'New article is added' });
    })
    .catch (error => {
        return res.status(500).send(error.message);
    })
}

const updateArticle = async (req, res) => {
    try {
        // Fetch the article by primary key (ID)
        const article = await models.Article.findByPk(req.params.id);
        
        // Check if article exists
        if (!article) {
            return res.status(404).send('Article not found');
        }
        
        // Update the article fields
        article.name = req.body.name;
        article.slug = req.body.slug;
        article.image = req.body.image;
        article.body = req.body.body;
        article.author_id = req.body.author_id;
        article.published = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        // Save the updated article
        await article.save();
        
        // Send the updated article in the response
        return res.status(200).json({ article });
    } catch (error) {
        // Handle any errors that occur during the query or save operation
        console.error('Error updating article:', error);
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createArticle,
    updateArticle
};