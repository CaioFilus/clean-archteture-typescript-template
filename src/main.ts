import UserHttpController from "@/InterfaceAdapters/controllers/http/UserHttpController";
import AuthHttpController from "@/InterfaceAdapters/controllers/http/AuthHttpController";

import LoginUseCaseFactory from "@/Main/factories/UseCase/LoginUseCaseFactory";

import webserver from "@/Main/factories/webserverFactory";


const authHttpController = new AuthHttpController(LoginUseCaseFactory());
const userHttpController = new UserHttpController();

// console.log(authHttpController);
webserver.registerController(authHttpController);

webserver.start();

