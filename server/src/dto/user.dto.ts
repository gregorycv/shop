import { User } from '../models/user';

class UserDto {
  public id: number;
  public fistName: string;
  public lastName: string;
  public email: string;

  constructor(user: User) {
    this.id = user.id;
    this.fistName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}

export default UserDto;
