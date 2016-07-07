import UserInterface = require('../model/UserInterface');
declare class UserManager {
    static create(user: UserInterface, callback: (err, user: UserInterface) => void): void;
    static findById(user_id: string, options: {
        include_inactive?: boolean;
    }, callback: (err, user: UserInterface) => void): void;
    static removeById(user_id: string, callback: any): void;
    static update(user: UserInterface, edits: any, callback: (err, user: UserInterface) => void): void;
    private static sanitize(user);
}
export = UserManager;
