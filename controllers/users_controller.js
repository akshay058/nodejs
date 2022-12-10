const User = require('../models/user');
const fs =require('fs');
const path = require('path');
const { dirname } = require('path');


// find user
module.exports.profile=function(req,res){
  User.findById(req.params.id, function(err,user){
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user // use to check on which profile we seen
  });  
});
}
//res.end('<h1> User Profile</h1>');


// update the profile page.................
//(req.params.id (use for route parameter)...req.body.id(actual form data send from form))

module.exports.update= async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }

    if(req.user.id == req.params.id){

        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){ console.log('*****Multer Error:', err);}
                //console.log(req.file);
                user.name= req.body.name;
                user.email= req.body.email;

                if(req.file){
                    // delete file uploaded as avatar
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of the uploads file into the avatar field in the user
                    user.avatar= User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');

        }
    }

    else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}


//render the sign up page....
module.exports.signUp = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}


// render the sign in page....
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');

    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data on creation
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){ // check is password match
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){ // check if user or not
        if(err){req.flash('error', err); return}

        if(!user){ // if no user present then create
            User.create(req.body,function(err,user){
                if(err){ req.flash('error', err); return;}

                req.flash('success', 'You have signed up, login to continue!');
                return res.redirect('/users/sign-in');
            })

        }
        else // if user present
        {
            
        req.flash('error', 'User Email id already present!');
            res.redirect('back');
        }
        
    });

}

//get the sign in data and create session for user
module.exports.createSession= function(req,res){
   req.flash('success','Logged in Successfuly');
    return  res.redirect('/');

}

module.exports.destroySession = function(req,res){
    req.logout(function(err){ //by passport predefined
        if(err){
            return err;
        }
        //flashing message
        req.flash('success','You have logged out!');
        return res.redirect('/');

    }); 
    
}