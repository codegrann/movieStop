import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '../models/userModel';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email)
          return done(null, false, { message: 'No email from Google' });

        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email });
        }

        if (!user) {
          user = new User({
            googleId: profile.id,
            email,
            name: profile.displayName,
            favorites: [],
          });
          await user.save();
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        // Attach accessToken to the user object for this request
        const userWithToken = user.toObject() as IUser & {
          accessToken: string;
        };
        userWithToken.accessToken = accessToken;

        done(null, userWithToken as any);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user as any);
});
