import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UsersController from '@/controllers/users.controller';


class UsersRoute implements Routes {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();

       constructor() {
              this.initializeRoutes();

       }

       private initializeRoutes() {
              this.router.get(`${this.path}/get-users`, this.usersController.getAllUsers);
              this.router.post(`${this.path}/get-user-by-token`, this.usersController.getUserByToken);
              this.router.post(`${this.path}/edit-user`, this.usersController.updateUser);
              this.router.post(`${this.path}/delete-user`, this.usersController.deleteUser);
              this.router.post(`${this.path}/create-user`, this.usersController.createUser);
       }

     


}


export default UsersRoute;
