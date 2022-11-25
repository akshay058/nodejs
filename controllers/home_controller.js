const { populate } = require('../models/post');
const Post = require('../models/post');
const { post } = require('../routes');
const User = require('../models/user');

module.exports.home= async function(req,res){

    try{
        //populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
        path:'comments',
        populate: {
            path: 'user'
            }
        });

        let users = await User.find({});
        return res.render('home',{
        title: "Codeial|Home" ,
        posts: posts,
        all_users: users 
        });

    }
    catch(err){
        console.log("Error",err);
        return;
    }
}



// module.exports.home=function(req,res){
//     //console.log(req.cookies);
//     // populate the user for each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate: {
//             path: 'user'
//         }
//     }).exec(function(err,posts){

//         // finding all users
//         User.find({},function(err,users){
//             return res.render('home',{
//                 title: "Codeial|Home" ,
//                 posts: posts,
//                 all_users: users 

//         });
        
//         });
//     });


    
// }