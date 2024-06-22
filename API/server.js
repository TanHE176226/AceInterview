import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

import { User, Company, CV, Industry, JobApplied, Job } from './models/index.js'

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import session from 'express-session';


//import router
import { companiesRouter } from './router/index.js';
import { jobRouter } from './router/index.js';
import { userRouter } from './router/index.js';
import { cvRouter } from './router/index.js';
import { jobAppliedRouter } from './router/index.js';


dotenv.config();
// Định nghĩa 1 webserver
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// // Dummy User Model for testing purposes
// const Users = {
//     findOrCreate: ({ googleId, email, displayName }, callback) => {
//       // Simulate a user object for testing
//       const user = { id: googleId, email, displayName };
//       callback(null, user);
//     }
//   };
  
//   // Configure Passport with Google OAuth2 Strategy
//   passport.use(new GoogleStrategy({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:9999/auth/google/callback',
//       passReqToCallback: true
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       // Extract relevant user information from Google profile
//       const { id, displayName, email } = profile;
  
//       // Pass user information to findOrCreate method
//       Users.findOrCreate({ googleId: id, email, displayName }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   ));

// // Serialize user
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// // Deserialize user
// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// // Middleware for session handling
// app.use(session({ secret: '06cd0b8589fddde92ed1348a1f40c4cb7fca5624d237c9b078057cf5f93ab59f8f59d29361d8bd287d8a85a8395da8d72eb8721713142d09dff04081dc68f653', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//       successRedirect: '/auth/profile',
//       failureRedirect: '/'
//     })
//   );
  

// app.get('/auth/profile', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.send(`<h1>Hello, ${req.user.displayName}</h1`);
//     } else {
//         res.redirect('/');
//     }
// });

// app.get('/auth/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });

// Kích hoạt middleware cho phép Express đọc json từ body của request
app.use(express.json());
app.use(cors(corsOptions));

app.use(fileUpload());
app.use('/uploads', express.static('uploads'));


//define uri couter
app.use('/company', companiesRouter);
app.use('/job', jobRouter);
app.use('/user', userRouter);
app.use('/cv', cvRouter);
app.use('/appliedjobs', jobAppliedRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB();
    console.log(`Webserver is running at http://localhost:${port}`);
})