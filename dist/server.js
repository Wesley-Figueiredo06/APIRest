"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

const port = process.env.APP_PORT;

_appjs2.default.listen(process.env.APP_PORT, () => {
    console.log(`Servidor logado! http://localhost:${port}`);
});