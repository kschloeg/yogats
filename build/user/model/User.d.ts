import UserStatus = require('./UserStatus');
import UserInterface = require('./UserInterface');
declare class User implements UserInterface {
    id: string;
    first_name: string;
    last_name: string;
    create_date: Date;
    status_change_date: Date;
    status: UserStatus;
    constructor(user?: any);
    toDocument(): {
        id: string;
        first_name: string;
        last_name: string;
        create_date: Date;
        status_change_date: Date;
        status: UserStatus;
    };
}
export = User;
