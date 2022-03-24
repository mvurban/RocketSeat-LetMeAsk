
export type User = {
   id: string;
   name : string;
   avatar : string;
}


export function CreateUser(id:string, name:string | null, avatar:string | null) : User{

   let user = {} as User;

   user.id = id;
   user.name = name ? name :  "N/A";
   user.avatar = avatar ? avatar : "N/A"

   return user;
}