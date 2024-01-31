import { Injectable } from '@nestjs/common';

export type User = {userId : number , username : string , password : string , role : string};


/**
 * User management is static , Single Admin and Single user has been considered. Their details have been assumed , these can be changed as per requirement.
 */
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Honey',
      password: 'Honey@12345',
      role: 'Admin',
    },
    {
      userId: 2,
      username: 'Aman',
      password: 'Aman@12345',
      role: 'User',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}