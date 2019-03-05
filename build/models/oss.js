var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ORM = require("./orm");
const uuid = require("uuid/v1");
const { tableName } = require("./decorator");
let OSSModel = class OSSModel extends ORM {
    /**
     * @param {object} params
     * @param {string} params.token
     * @param {string} params.content
     */
    constructor(params) {
        super(params);
        this.token = params.token || uuid();
        this.content = params.content;
    }
};
OSSModel = __decorate([
    tableName("oss")
], OSSModel);
module.exports = OSSModel;
//# sourceMappingURL=oss.js.map