import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import config from './config/config.js';
import './db.js';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import userRouter from './routes/user.routes.js'
import sessionRouter from './routes/session.routes.js'
import initializePassport from './config/passport.config.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({ mongoUrl: config.mongodbUri }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);

app.listen(config.port, () => {
  console.log(`Servidor escuchando en puerto ${config.port}`);
});
