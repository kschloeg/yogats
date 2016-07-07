import UserStatus = require('./UserStatus');
import UserInterface = require('./UserInterface');

class User implements UserInterface {
    public id: string;
    public first_name: string;
    public last_name: string;
    public create_date: Date;
    public status_change_date: Date;
    public status: UserStatus;

    constructor(user?: any) {
        if (user) {
            this.id = user.id;
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.create_date = user.create_date;
            this.status_change_date = user.status_change_date;
            this.status = user.status;
        }
    }

    public toDocument() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            create_date: this.create_date,
            status_change_date: this.status_change_date,
            status: this.status
        };
    }
}

export = User;
