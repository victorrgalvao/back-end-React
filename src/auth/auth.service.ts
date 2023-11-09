import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService) { }
    async register({ username, password }: RegisterDto) {
        const user = await this.userService.findOne(username);

        if (user) {
            throw new BadRequestException('usuario ja existe')
        }
        return await this.userService.create({ username, password: await bcryptjs.hash(password, 10) })
    }


    async login({ username, password }: LoginDto) {
        const user = await this.userService.getUserWithFavoriteFilms(username);
        console.log(user.filmesFavoritos)
        if (!user) {
            throw new UnauthorizedException('username nao esta correto');
        }
        const senhaValida = await bcryptjs.compare(password, user.password);

        if (!senhaValida) {
            throw new UnauthorizedException('a senha nao esta correta');
        }
        
        // const filmeIds = user.filmesFavoritos;
        // console.log(filmeIds)
        const payload = { username: user.username }
        const token = await this.jwtService.signAsync(payload)
        return {
            token: token,
            user: user,
         
        }
    }
}
