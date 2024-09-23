"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
_dotenv2.default.config();
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _homeRoutesjs = require('./routes/homeRoutes.js'); var _homeRoutesjs2 = _interopRequireDefault(_homeRoutesjs);
var _userRoutesjs = require('./routes/userRoutes.js'); var _userRoutesjs2 = _interopRequireDefault(_userRoutesjs);
var _tokenRoutesjs = require('./routes/tokenRoutes.js'); var _tokenRoutesjs2 = _interopRequireDefault(_tokenRoutesjs);
var _alunoRoutesjs = require('./routes/alunoRoutes.js'); var _alunoRoutesjs2 = _interopRequireDefault(_alunoRoutesjs);
var _fotoRoutesjs = require('./routes/fotoRoutes.js'); var _fotoRoutesjs2 = _interopRequireDefault(_fotoRoutesjs);
require('./database/index.js');

const whiteList = ["https://react.cyrus.com.br", "http://localhost:3000"];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

class App {
    constructor() {
        this.app = _express2.default.call(void 0, );
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(_cors2.default.call(void 0, corsOptions));
        this.app.use(_helmet2.default.call(void 0, ));
        this.app.use(_express2.default.urlencoded({ extended: true }));
        this.app.use(_express2.default.json());
        this.app.use(
            "/images/",
            _express2.default.static(_path.resolve.call(void 0, __dirname, "..", "uploads", "images"))
        );
    }

    routes() {
        this.app.use("/", _homeRoutesjs2.default);
        this.app.use("/users/", _userRoutesjs2.default);
        this.app.use("/tokens/", _tokenRoutesjs2.default);
        this.app.use("/alunos/", _alunoRoutesjs2.default);
        this.app.use("/fotos/", _fotoRoutesjs2.default);
    }
}

exports. default = new App().app;
