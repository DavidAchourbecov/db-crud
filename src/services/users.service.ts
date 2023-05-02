import { isEmpty } from '@utils/util';
import { prismaClient } from '@/prisma';
import { HttpException } from '@exceptions/HttpException';
import { Users } from '@prisma/client';
import { trace } from 'console';
import { SignupUser } from '@/interfaces/users.interfaces';
import jwt from 'jsonwebtoken';
import settings from  'settings.json'
import { compare, hash } from 'bcrypt';




class UserService{
       public users = prismaClient.users;
       public keyToken = 'secret';

       public async getAllUsers(): Promise<Users[]>  {
              try {
                     const allUsers: Users[] = await this.users.findMany();
                     return allUsers;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
              
       }

       public async getUserByToken(token: string): Promise<Users> {
              try {
                     if (isEmpty(token)) throw new HttpException(400, 'Token is empty');
                     const findUser: Users = await this.users.findUnique({ where: { token: token } });
                     if (!findUser) throw new HttpException(409, "User doesn't exist");
                     return findUser;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }

       public async  createUser(newUser:SignupUser): Promise<string>  {
              try {
                     if (isEmpty(newUser)) throw new HttpException(400, 'userData is empty');
                     const findEmail: Users = await this.users.findUnique({ where: { email: newUser.email } });
                     if (findEmail) throw new HttpException(409, `This email ${newUser.email} already exists`);

                     const  findPhone: Users = await this.users.findUnique({ where: { phone: newUser.phone } });
                     if (findPhone) throw new HttpException(409, `This phone ${newUser.phone} already exists`);
                     newUser.password = await hash(newUser.password, 10);
                     newUser.imageProfile =  newUser.imageProfile ? newUser.imageProfile : settings.imageProfile;
                     const user = this.convrtSignupUserToUser(newUser);
                     delete user.id;
                     //delete user.expoToken;

                     const createUserData: Users = await this.users.create({ data: { ...user } });
                     return createUserData.token;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }


       }

       public async updateUser( userData: SignupUser): Promise<Users> {
              try {
                     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
                     const findUser: Users = await this.users.findUnique({ where: { email: userData.email } });
                     if (!findUser) throw new HttpException(409, "User doesn't exist");
                     const user = this.convrtSignupUserToUser(userData);
                     const updateUserData = await this.users.update({ where: { id: userData.id }, data: { ...user } });
                     return updateUserData;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }

       public async deleteUser(userId: number): Promise<Users> {
              try {
                     if (isEmpty(userId)) throw new HttpException(400, 'userData is empty');
                     const findUser: Users = await this.users.findUnique({ where: { id: userId } });
                     if (!findUser) throw new HttpException(409, "User doesn't exist");
                     const deleteUserData = await this.users.delete({ where: { id: userId } });
                     return deleteUserData;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }

        




       public createToken(user: SignupUser): string {
              try {
                     const token = jwt.sign({ 
                            email:user.email,
                            imageProfile:user.imageProfile
                      }, this.keyToken,
                            {
                                   algorithm: 'HS256',
                                   expiresIn: '24h'
                            }
                            );
                     return token;
              } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }


       public convrtSignupUserToUser(newUser: SignupUser): Users {
              try {
                     const user: Users = {
                            id: newUser.id,
                            email: newUser.email,
                            password: newUser.password,
                            token: this.createToken(newUser),
                            fullName: newUser.fullName,
                            phone: newUser.phone,
                            city: newUser.city,
                            expoToken: newUser.expoToken,
                            imageProfile: newUser.imageProfile ? newUser.imageProfile : settings.imageProfile,
                            isAdmin: false,
                            
                     }
                         return user;
                     } catch (error) {
                     throw new HttpException(400, error.message);
              }
       }








}

export default UserService;