import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/shared/Interfaces/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() user: User): Observable<object> {
    return this.userService
      .login(user)
      .pipe(map((jwt: string) => ({ access_token: jwt })));
  }
}
