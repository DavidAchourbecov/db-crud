
export interface SignupUser{
       id: number;
       fullName: string;
       email: string;
       password: string;
       phone: string;
       city: string;
       expoToken?: string;
       imageProfile?: string;
       isAdmin?: boolean;


}

/*

   id                   Int              @id @default(autoincrement())
  email                String           @unique
  token                String           @unique
  fullName             String
  phone                String           @unique
  city                 String
  expoToken            String
  imageProfile         String?           @db.Text() 
  isAdmin              Boolean          @default(false)
*/ 

