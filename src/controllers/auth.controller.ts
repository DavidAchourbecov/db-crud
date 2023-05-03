import { NextFunction, Request, Response } from 'express';
import {SignupUser,LoginUser} from '@/interfaces/users.interfaces';
import AuthService from '@/services/auth.service';


class AuthController {
       public authService = new AuthService();

       public signUp = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     const userData: SignupUser = req.body;
                     const token = await this.authService.signup(userData);

                     res.status(201).json({
                            data: {
                                   token: token,
                            },
                            message: 'signup',
                     });

              } catch (error) {
                     next(error);
              }

       };

       public logIn = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     const userData: LoginUser = req.body;
                     const  token  = await this.authService.login(userData);

                     res.status(200).json({
                            data: {
                                   token: token,
                            },
                            message: 'login',
                     });

              } catch (error) {
                     next(error);
              }
       };

       
} 

export default AuthController;
