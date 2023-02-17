import AuthHttpController from "./InterfaceAdapters/controllers/http/AuthHttpController";

import LoginUseCaseFactory from "./Main/factories/UseCase/LoginUseCaseFactory";

import webserver from "./Main/factories/webserverFactory";


const authHttpController = new AuthHttpController(LoginUseCaseFactory());

// console.log(authHttpController);
webserver.registerController(authHttpController);

webserver.start();

