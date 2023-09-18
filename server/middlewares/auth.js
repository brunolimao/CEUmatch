const passport = require('passport');
const jwt = require('jsonwebtoken');

const hashSecretKey = '67c0fbaeee22ae50902039bd1523c094dc27b4bce6ef664a939ac3bb2dbc780d'

function loginMiddleware (req,res,next) {
    passport.authenticate(
        'login',
        (error, user, info) => {
            try {
                if (error) return next(error);

                if (!user) {
                    throw new Error('usuário Inválido');
                }
                
                const body = {
                    id: user.id,
                    email: user.email
                };
            
                const token = jwt.sign({user: body}, hashSecretKey, {
                    expiresIn: '1h',
                });

                res.cookie ('jwt', token, {
                    httpOnly: true,
                    //secure: process.env.NODE_ENV === 'production',
                })

                res.status(200).json(body);
            } catch (error) {
                next(error);
            }   
        }
    )(req, res, next); 
}

function jwtMiddleware(req, res, next) {
    passport.authenticate('jwt', {session: true}, (error, user, info) => {
      try {
        if (error) return next(error);
  
        if (!user) {
          throw new Error('Você precisa estar logado para realizar essa ação');
        }

        req.user = user;

        next();
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  }
  
  module.exports = {
    loginMiddleware,
    jwtMiddleware,
  };