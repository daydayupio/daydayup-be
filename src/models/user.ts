import { BaseModel, BaseDef } from "./baseModel";
import * as pw from "../util/password";
import { AuthorizationModel } from "./authorization";
import { tableName } from "../util/decorators/model";

export interface UserDef {
    /** 用户名 */
    name: string
    /** 密码 */
    password: string
    /** 邮箱 */
    email: string
    /** 角色代码 */
    role_code: string
}

@tableName("users")
export class UserModel extends BaseModel<UserDef & BaseDef> {
    static db = new UserModel()
    static new(option?: Partial<UserDef>) {
        return new UserModel(option)
    }

    /** 查询符合对应条件的 user */
    static async validate({ name, password }: { name: string, password: string }) {
        const results = await UserModel.db.find({
            name,
            password: pw.encrypt(password),
        });
        return results[0];
    }

    /** 查询 token 是否有效 */
    static async isTokenValid({ user_id, token }) {
        const results = await AuthorizationModel.db.find({
            user_id,
            token,
        });
        return results.length > 0;
    }

    /** 更新 token */
    static async updateToken({ user_id, token }) {
        await AuthorizationModel.db.insertOrUpdate({ token }, { user_id })
    }

    public name: string;
    public password: string;
    public email: string;
    public role_code: string;
    constructor(params: Partial<UserDef> = {}) {
        super();
        this.name = params.name;
        this.password = params.password;
        this.email = params.email;
        this.role_code = params.role_code;
    }
}
