"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_Handler_1 = __importDefault(require("./Handlers/user.Handler"));
const product_Handler_1 = __importDefault(require("./Handlers/product.Handler"));
const order_Handler_1 = __importDefault(require("./Handlers/order.Handler"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, user_Handler_1.default)(app);
(0, product_Handler_1.default)(app);
(0, order_Handler_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
