"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../utils/pick");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const catchAsync_1 = require("../utils/catchAsync");
const users_service_1 = require("./users.service");
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_service_1.usersService.createUser(req.body);
    res.status(http_status_1.default.CREATED).send(user);
}));
const getUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.pick)(req.query, ['name', 'role']);
    const options = (0, pick_1.pick)(req.query, ['sortBy', 'limit', 'page']);
    const result = yield users_service_1.usersService.queryUsers(filter, options);
    res.send(result);
}));
const getUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_service_1.usersService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    res.send(user);
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_service_1.usersService.updateUserById(req.params.userId, req.body);
    res.send(user);
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_service_1.usersService.deleteUserById(req.params.userId);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
exports.usersController = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
