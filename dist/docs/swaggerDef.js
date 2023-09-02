"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { version } = require('../../package.json');
const config_1 = require("../config/config");
const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'node-express-boilerplate API documentation',
        version,
        license: {
            name: 'MIT',
            url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
        },
    },
    servers: [
        {
            url: `http://localhost:${config_1.config.port}/v1`,
        },
    ],
};
exports.default = swaggerDef;
