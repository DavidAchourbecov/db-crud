import { NextFunction, Request, Response } from 'express';
import UserService from '@/services/users.service';
import { SignupUser } from '@/interfaces/users.interfaces';


class UsersController {
       public userService = new UserService();


       public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     const allUsrs = await this.userService.getAllUsers();
              res.status(200).json({ data:allUsrs , message: 'find all users' });
              } catch (error) {
              next(error);
              }
       };

       public getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     let token:string = req.body.token;
                     const user = await this.userService.getUserByToken(token);
              res.status(200).json({ data:user , message: 'find user by token' });
              } catch (error) {
              next(error);
              }

       };

       public createUser = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     let newUser:SignupUser = req.body;
                     const user = await this.userService.createUser(newUser);
              res.status(200).json({ data:user , message: 'create user' });
              } catch (error) {
              next(error);
              }
       };



       public updateUser = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     let editUser:SignupUser = req.body;
                     const user = await this.userService.updateUser(editUser);
              res.status(200).json({ data:user , message: 'update user' });
              } catch (error) {
              next(error);
              }

       };

       public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
              try {
                     let id:number = req.body.id;
                     const user = await this.userService.deleteUser(id);
              res.status(200).json({ data:user , message: 'delete user' });
              } catch (error) {
              next(error);
              }

       }

} 


export default UsersController;