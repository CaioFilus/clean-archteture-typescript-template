
// SingletonPattern
import {DataSource} from "typeorm";

import UserModel from "@/InterfaceAdapters/repository/models/UserModel";

const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [UserModel],
});


const mainModels = {
    user: dataSource.getRepository(UserModel),
}

dataSource.initialize();

export default function typeOrmFactory() {
    return {
        main: {
            dataSource,
            models: mainModels,
        },
    };
}
