import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserCreationAttributes as CreateUserDto } from './../models/user';
import { UserDto } from '../dto';
import { TokenData } from '../interfaces';
import { db } from '../db';

class AuthenticationService {
  public async register(userData: CreateUserDto) {
    if (await db.User.findOne({ where: { email: userData.email } })) {
      throw new Error('Error during registration. User with this email alreadt exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 3);
    const user = await db.User.create({
      ...userData,
      password: hashedPassword,
    });
    const userDto = new UserDto(user);
    const tokenData = this.createToken(userDto);
    const cookie = this.createCookie(tokenData);
    return { cookie, user: userDto, token: tokenData.token };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: UserDto): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET as string;
    const dataStoredInToken = {
      id: user.id,
      email: user.email,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
