"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_Model_1 = require("../Models/user.Model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_middelware_1 = __importDefault(require("./Auth.middelware"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const Options = new user_Model_1.user_Options();
const index = async (req, res) => {
    const list_Of_Users = await Options.index();
    res.json(list_Of_Users);
};
const show = async (req, res) => {
    const id = req.body.id;
    const required_User = await Options.show(id);
    res.json(required_User);
};
const create = async (req, res) => {
    try {
        const User = {
            fname: req.body.fname,
            lname: req.body.Lname,
            password: req.body.password
        };
        // console.log(User)
        const newUser = await Options.create(User);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/Users', Auth_middelware_1.default, index);
    app.get('/Users/id', Auth_middelware_1.default, show);
    app.post('/Users', create);
};
exports.default = userRoutes;
