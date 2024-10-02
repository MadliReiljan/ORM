const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const articleAdminController = require('../controllers/admin/article')

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);


router.get('/admin', articleAdminController.getAllArticles);
router.get('/admin/article/create', (req, res) => { res.render('create'); });

router.post('/admin/article/create', (req, res) => articleAdminController.createArticle(req, res))
router.get('/admin/article/edit/:id', articleAdminController.getArticleById);
router.post('/admin/article/edit/:id',(req, res) => articleAdminController.updateArticle(req, res));
router.post('/admin/article/delete/:id', (req, res) => articleAdminController.deleteArticle(req, res));


module.exports = router;