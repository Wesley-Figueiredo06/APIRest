"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _FotoControllerjs = require('../controllers/FotoController.js'); var _FotoControllerjs2 = _interopRequireDefault(_FotoControllerjs);
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);


const router = new (0, _express.Router)();

router.post('/', _loginRequiredjs2.default, _FotoControllerjs2.default.store);


exports. default = router;