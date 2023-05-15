import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto, CreateUserDto, LoginDto, RegisterDto  } from './dto/index';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
  }

  @UseGuards( AuthGuard ) /* Reviso que venga el token */
  @Get() 
  findAll(@Request() req: Request) {
    const user = req['user'];
    // return user;
    return this.authService.findAll();
  }

  @UseGuards( AuthGuard ) /* Reviso que venga el token */
  @Get('/check-token') 
  checkToken(@Request() req: Request):LoginResponse {
    const user = req['user'] as User;
    return {
      token: this.authService.getJwtToken({id : user._id}),
      user
    }
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
