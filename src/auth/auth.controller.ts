import { Body, Controller,Get,Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService:AuthService){}

    @Post('register')
    register(@Body() resgisterDto:RegisterDto){
        return this.authService.register(resgisterDto);
    }


    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req) {
    //   return req.user;
    }
    

}
