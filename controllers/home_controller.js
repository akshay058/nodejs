const { populate } = require('../models/post');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.home=function(req,res){
    //return res.end('<h1>Express is up for Codeial</h1>')
    //console.log(req.cookies);


    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial|Home" ,
    //         posts: posts

    // });
    // });
    // populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path: 'user'
        }
    }).exec(function(err,posts){
        return res.render('home',{
        title: "Codeial|Home" ,
        posts: posts 
        });
    });


    
}