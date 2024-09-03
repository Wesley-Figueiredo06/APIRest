"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoControllerjs = require('../controllers/AlunoController.js'); var _AlunoControllerjs2 = _interopRequireDefault(_AlunoControllerjs);
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);
const router = new (0, _express.Router)();

router.get('/', _AlunoControllerjs2.default.index);
router.post('/', _loginRequiredjs2.default, _AlunoControllerjs2.default.store);
router.get('/:id', _AlunoControllerjs2.default.show);
router.put('/:id', _loginRequiredjs2.default, _AlunoControllerjs2.default.update);
router.delete('/:id', _loginRequiredjs2.default, _AlunoControllerjs2.default.delete);


exports. default = router;