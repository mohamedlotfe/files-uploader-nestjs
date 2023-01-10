import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { User } from 'src/shared/Interfaces/user.interface';
import { switchMap, map } from 'rxjs/operators';
import { UserRole } from 'src/shared/Interfaces/role.enum';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) return this.authService.generateJWT(user).pipe((jwt) => jwt);
        else throw Error('Unauthorized user!');
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByEmail(email).pipe(
      switchMap((user: User) => {
        return this.authService.comparePassword(password, user.password).pipe(
          map((isMatched: boolean) => {
            console.log('isMatched', isMatched);

            if (isMatched) {
              const { password, ...res } = user;
              return res;
            }
            throw new UnauthorizedException('Not Authorized');
          }),
        );
      }),
    );
  }
  findByEmail(email: string): Observable<User> {
    const users: User[] = [
      {
        id: 11111,
        name: 'John',
        username: 'mo test',
        role: UserRole.User,
        email: 'test@test.com',
        password:
          '$2b$12$NgelbXLGIqIIaK7hBh/YReALAaxGWOs1IP7B4qQFXZhetXtbL2RF6',
      },
    ];
    // TODO select from DB not constant value
    // return from(this.userRepo.findOne({ where: { email } }));

    return of(users.find((u) => u.email === email));
  }
}
