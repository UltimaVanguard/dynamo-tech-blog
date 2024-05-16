const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts, 
            logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('profile', {
            posts,
            user_id: req.session.user_id, 
            logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('./posts/:id', async (req,res) => {
    try {
        const postData = await Post.findOne({
            include: [
                {
                    model: Comment,
                    include: [User]
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ],
            where: {
                post_id: req.params.id,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post', withAuth, async (req, res) => {
    res.render('post')
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
      }

    res.render('login')
})

module.exports = router;