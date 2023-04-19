import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../../daos/models/user.js";
import jwt from 'jsonwebtoken'
import { SALTENV } from '../../config/config.js'
import { SECRET } from '../../config/config.js'
import { TIPO_USUARIO_POR_DEFECTO } from '../../config/config.js'
import { STRING_CONEXION_MONGO } from '../../config/config.js';
import { USUARIO_CONEXION_MONGO } from '../../config/config.js';
import { PASSWORD_CONEXION_MONGO } from '../../config/config.js';
import { BD_MONGO } from '../../config/config.js';


export default function logIn(servidor) {


	const SALT = SALTENV

	servidor.use(session({

		store: MongoStore.create({
			//En Atlas connect App :  Make sure to change the node version to 2.2.12:
			mongoUrl: STRING_CONEXION_MONGO + USUARIO_CONEXION_MONGO + ':' + PASSWORD_CONEXION_MONGO + BD_MONGO,
		}),
		/* ----------------------------------------------------- */

		secret: SECRET,
		ttl: 600,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 600000
		},
		rolling: true,
		resave: true,
		saveUninitialized: false
	}))


	passport.use(
		"login",
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			(req, username, password, done) => {
				User.findOne({ username: username }, (err, user) => {
					if (err) return done(err);
					if (!user) {
						console.log("User Not Found with username " + username);
						return done(null, false);
					}
					if (!validatePassword(user, password)) {
						console.log("Invalid Password");
						return done(null, false);
					}
					return done(null, user);
				});
			}
		)
	);


	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			function (req, username, password, done) {
				User.findOne({ username: username }, function (err, user) {
					if (err) {
						console.log("Error in SignUp: " + err);
						return done(err);
					}
					if (user) {
						console.log("User already exists");
						return done(null, false);
					} else {
						console.log('User Registration succesful');


						const usuario = {
							username: username,
							password: createHash(password),
							nombre: req.body.nombre,
							apellido: req.body.apellido,
							foto: req.body.foto,
							tipo_usuario: TIPO_USUARIO_POR_DEFECTO
						}
						User.create(usuario, (err, userWithId) => {
							if (err) {
								console.log('Error in Saving user: ' + err);
								return done(err);
							}
							console.log(user)
							console.log('User Registration succesful');
							return done(null, userWithId);
						});
					}
				});
			}
		)
	);

	/* const validatePassword = (user, password) => {

	   const  objetoOriginal = jwt.verify(user.password, SALT)

		  if(password === objetoOriginal.password)
			return true;
		  else
			return null;
	 };
	 
	 var createHash = function (password) {
		 return jwt.sign({password: password}, SALT);  //, { expiresIn: '24h' });
	 };
*/



	servidor.use(passport.initialize());

	//Sesiones
	servidor.use(passport.session());

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	//Fin Sesiones

}