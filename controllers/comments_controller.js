const Comment = require('../models/comment');
const Post = require('../models/post');

// Create comment....................................................


module.exports.create = async function(req,res){

    try{

        let post = await Post.findById(req.body.post);

        if(post){
           let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment); // add comments to post model db when comments created
            post.save(); // always do save after adding
            req.flash('success', 'Comment published!');
            res.redirect('/');
        }   
    }

    catch(err){
        req.flash('error', err);
        //console.log("Error",err);
        return;
    }
}

// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 if(err){ console.log("Error in finding comments");return;}
//             post.comments.push(comment); // add comments to post model db when comments created
//             post.save(); // always do save after adding

//             return res.redirect('/');

//             });
//         }
//     });

// }

// Delete comments.............................................



module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);

        //.id means converting the object id into string
        if(comment.user==req.user.id){
            let postId =comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId,{ $pull: {comments:req.params.id}});
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }

    }

    catch(err)
    {
        //console.log("Error",err);
        req.flash('error', err);
        return;
    }
   
}

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment)
//     {
//         //.id means converting the object id into string
//         if(comment.user==req.user.id){

//             let postId =comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId,{ $pull: {comments:req.params.id}},function(err,post){
//                 return res.redirect('back');
//             });
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }