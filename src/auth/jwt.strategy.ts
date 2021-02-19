import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        //Quando usa o super é porque está chamando diretamente o construtor da classe que está herdando no caso (PassportStrategy)
        super({
            // Intercepta todas as requisições e busca no header um Bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any) {
        const { email } = payload;
        const user = await this.authService.validateUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
