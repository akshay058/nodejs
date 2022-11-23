const User = require('../models/user');


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

module.exports.update=function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }
    else{
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
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){ // check if user or not
        if(err){console.log('Error in finding user in signing up'); return}

        if(!user){ // if no user present then create
            User.create(req.body,function(err,user){
                if(err){ console.log('Error in finding user in signing up'); return}
                return res.redirect('/users/sign-in');
            })

        }
        else // if user present
        {
            res.redirect('back');
        }
        
    });

}

//get the sign in data and create session for user
module.exports.createSession= function(req,res){
   return  res.redirect('/');

}

module.exports.destroySession = function(req,res){
    req.logout(function(err){ //by passport predefined
        if(err){
            return err;
        }
        return res.redirect('/');

    }); 
    
}