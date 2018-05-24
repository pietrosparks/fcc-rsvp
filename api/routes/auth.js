module.exports = (api, Users, functions, _) => {
    api.post('/login', (req, res) => {
        Users.findOne({
            username: req.body.username
        }).then(user => {
            if (!user) {
                req.body.password = functions.passwordHash(req.body.password);
                const newUser = new Users(req.body);
                newUser.save().then(user => {
                    const pickedUser = _.pick(user,['id','username'])
                    return functions.jsonResponse(200,'success', pickedUser, res,'Successfully created user & logged in')
                });
            } else if (user) {
                const passwordCheck = functions.passwordDecrypt(req.body.password, user.password);
                if (passwordCheck) {
                    const pickedUser = _.pick(user,['id','username'])
                    return functions.jsonResponse(200,'success', pickedUser, res,'Successfully Logged in')
                } else  return functions.jsonResponse(401,'error', null, res,'Unauthorized',err );
            }
        }).catch(err => {
            console.log(err);
        })
    })
}