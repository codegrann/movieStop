"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userModel_ts_1 = __importDefault(require("../models/userModel.ts"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        if (!email)
            return done(null, false, { message: 'No email from Google' });
        let user = await userModel_ts_1.default.findOne({ googleId: profile.id });
        if (!user) {
            user = await userModel_ts_1.default.findOne({ email });
        }
        if (!user) {
            user = new userModel_ts_1.default({
                googleId: profile.id,
                email,
                name: profile.displayName,
                favorites: [],
            });
            await user.save();
        }
        else if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
        }
        user.accessToken = accessToken;
        done(null, user);
    }
    catch (err) {
        done(err, undefined);
    }
}));
passport_1.default.serializeUser((user, done) => done(null, user._id));
passport_1.default.deserializeUser(async (id, done) => {
    const user = await userModel_ts_1.default.findById(id);
    done(null, user);
});
