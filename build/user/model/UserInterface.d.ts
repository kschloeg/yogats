import UserStatus = require('./UserStatus');
interface UserInterface {
    id?: string;
    first_name: string;
    last_name: string;
    create_date: Date;
    status_change_date: Date;
    status: UserStatus;
    toDocument(): Object;
}
export = UserInterface;
