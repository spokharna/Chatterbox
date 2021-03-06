
 'use strict'

 const router = require('express').Router()
 const User = require('../models/User')

 router.route('/')
     .get((req, res) => res.render('login'))

     .post(async (req, res) => {
       const user = await User.findOne({ email: req.body.email })

       if (user) {
         const match = await user.compare(req.body.password)

         if (match) {
           req.session.login = true
           req.session.userId = user._id
           res.redirect('/chat')
         } else {
           req.session.flash = {
             type: 'danger',
             message: 'The username or password is incorrect.'
           }

           res.redirect('back')
         }
       } else {
         req.session.flash = {
           type: 'danger',
           message: 'The username or password is incorrect.'
         }

         res.redirect('back')
       }
     })

 module.exports = router
