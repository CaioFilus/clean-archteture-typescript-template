import {DataSource, Repository} from "typeorm";
import UserModel from "@/InterfaceAdapters/repository/models/UserModel";

export default interface DataSources {
    main: {
        models: {
            user: Repository<UserModel>;
        }
    } & DataSource;
}
