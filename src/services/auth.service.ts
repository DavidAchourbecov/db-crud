import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import {SignupUser,LoginUser} from '@/interfaces/users.interfaces';
import UserService from './users.service';

class AuthService{
       public userService = new UserService();

       public async signup(userData: SignupUser): Promise<string> {
              try {
                     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
                     let token = await this.userService.createUser(userData);
                     return token;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }

       public async login(userData:LoginUser ): Promise<string> {
              try {
              if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
              const token = await this.userService.login(userData);
              return token;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }    

}


export default AuthService;



