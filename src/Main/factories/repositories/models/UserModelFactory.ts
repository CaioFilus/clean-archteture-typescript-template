import typeOrmFactory from "@/Main/factories/repositories/TypeOrmFactory";
import TypeOrmModelAdapter from "@/Main/adapters/TypeOrmModelAdapter";

export default function UserModelFactory() {
    const dataSources = typeOrmFactory();
    return new TypeOrmModelAdapter(dataSources.main.models.user);
}
