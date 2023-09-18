const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

const hashSecretKey = '67c0fbaeee22ae50902039bd1523c094dc27b4bce6ef664a939ac3bb2dbc780d'

passport.use(
    'login', 
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: {email:email}
            });

            if (!user) {
                throw new Error('E-mail e/ou senha incorretos!');
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('E-mail e/ou senha incorretos!');
            }

            return done (null, user);
        } catch (error) {
            return done (error, false);
        }
    })      
);

const cookieExtractor = (req) => {
    let token = null;
  
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
  
    return token;
};

passport.use(
    new JwtStrategy(
            {
                secretOrKey: hashSecretKey,
                jwtFromRequest: cookieExtractor,
            },
            async (jwtPayload, done) => {
            try {
                const user = await User.findByPk(jwtPayload.user.id);

                if (user) {
                    done(null, jwtPayload.user);
                } else {
                    throw new Error('Usuário inválido');
                }
            } catch (error) {
                done(error, false);
            }
        },
    ),
);