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
            order: [
                ['createdAt'],
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

        const userData = await User.findOne({
            where: {
                id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }))
        const user = userData.get({ plain: true });

        res.render('profile', {
            posts,
            user,
            user_id: req.session.user_id, 
            logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/posts/:id', async (req,res) => {
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
                id: req.params.id,
            },
        });

        res.render('post', postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post', withAuth, async (req, res) => {
    res.render('newPost')
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
      }

    res.render('login')
})

module.exports = router;