const articleDbModel = require('../models/article')
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = []
    }

    async getAllArticles(req, res){
        try {
            const articles = await articleModel.findAll()
            res.status(201).json({articles: articles})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getArticleBySlug(req, res){
        const article = await articleModel.findOne(req.params.slug)
        res.status(201).json({article: article})
    }

    async createNewArticle(req, res){
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        res.status(201).json({
            message: `created article with id ${articleId}`,
            article: {id: articleId, ...newArticle}
        })
    }

        async updateArticle(req, res){
        const articleId = req.params.id
        const updatedArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author_id
        }
        const affectedRows = await articleModel.update(articleId, updatedArticle)
        if (affectedRows === 0) {
            return res.status(404).json({message: `article with id ${articleId} not found`})
        }
        res.status(200).json({
            message: `updated article with id ${articleId}`,
            article: {id: articleId, ...updatedArticle}
        })
    }

        async deleteArticle(req, res){
        const articleId = req.params.id
        const affectedRows = await articleModel.delete(articleId)
        if (affectedRows === 0) {
            return res.status(404).json({message: `article with id ${articleId} not found`})
        }
        res.status(200).json({
            message: `deleted article with id ${articleId}`
        })
    }
}

module.exports = articleController