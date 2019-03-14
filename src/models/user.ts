import { ORM } from "./orm";
import * as pw from "../util/password";
import { AuthorizationModel } from "./authorization";
import { tableName } from "./decorator";
import { password } from "src/config/database";

@tableName("users")
export class UserModel extends ORM {
    static async validate({ name, password }) {
        const { results } = await this.find({
            name,
            password: pw.encrypt(password),
        });
        return results[0];
    }
    static async isTokenValid({ userId, token }) {
        const { results } = await AuthorizationModel.find({
            user_id: userId,
            token,
        });
        return results.length > 0;
    }
    static encryptPassword(password) {
        return pw.encrypt(password);
    }
    static async updateToken({ userId, token }) {
        const { results } = await AuthorizationModel.find({ user_id: userId });
        if (results.length === 0) {
            await AuthorizationModel.insert({ user_id: userId, token });
        } else {
            await AuthorizationModel.update({ token }, { user_id: userId });
        }
    }

    public name: string;
    public password: string;
    public email: string;
    public role_code: string;
    constructor(params: {
        name: string;
        password: string;
        email: string;
        rule_code: string;
    }) {
        super();
        this.name = params.name;
        this.password = params.password;
        this.email = params.email;
        this.role_code = params.rule_code;
    }
    protected getCondition(): Object {
        return {
            name: this.name,
            password: this.password,
            email: this.email,
            role_code: this.role_code,
        };
    }
}
