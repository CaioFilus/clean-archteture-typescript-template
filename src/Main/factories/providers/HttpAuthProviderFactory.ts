import AuthContextProvider from "@/AplicationBusiness/provider/AuthContextProvider";
import UserTokenResolverProvider from "@/InterfaceAdapters/providers/UserTokenProvider";
import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import TokenService from "@/InterfaceAdapters/services/TokenService";
import JwtAdapter from "@/Main/adapters/JwtAdapter";

export default function HttpAuthProviderFactory() {
    const userRepository = new UserRepository();
    const tokenService = new TokenService(new JwtAdapter());

    const userResolverProvider = new UserTokenResolverProvider(userRepository, tokenService);
    return new AuthContextProvider(userResolverProvider);
}
