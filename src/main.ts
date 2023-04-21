import UserHttpController from "@/InterfaceAdapters/controllers/http/UserHttpController";
import HttpAuthProviderFactory from "@/Main/factories/providers/HttpAuthProviderFactory";
import UserCreateUseCaseFactory from "@/Main/factories/UseCase/UserCreateUseCaseFactory";
import UserListUseCaseFactory from "@/Main/factories/UseCase/UserListUseCaseFactory";
import AuthHttpController from "./InterfaceAdapters/controllers/http/AuthHttpController";

import "dotenv/config";

import LoginUseCaseFactory from "./Main/factories/UseCase/LoginUseCaseFactory";
import webserver from "./Main/factories/webserverFactory";

const authProvider = HttpAuthProviderFactory();

const authHttpController = new AuthHttpController(LoginUseCaseFactory());
const userHttpController = new UserHttpController(authProvider, UserCreateUseCaseFactory(), UserListUseCaseFactory());


webserver.registerController(authHttpController);
webserver.registerController(userHttpController);
webserver.start(3000);

