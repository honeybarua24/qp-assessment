
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * To route user request to service that will validate the credentials and generate the access token.
   * @param signInDto : Object containing the username and password.
   * @returns access token for success otheriwse error.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    try{
        return this.authService.signIn(signInDto.username, signInDto.password);
    }catch(error){
        throw new Error('Error While Creating Token.');
    }
  }
}
