import {PrismaClient} from "@prisma/client";

export interface IPrismaClient {
    main: PrismaClient,
}
