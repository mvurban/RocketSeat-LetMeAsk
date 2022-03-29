
export type TUser = {
   id: string;
   name : string;
   avatar : string;
}


export function objUser(id:string, name:string | null, avatar:string | null) : TUser{

   let user = {} as TUser;

   user.id = id;
   user.name = name ? name :  "N/A";
   user.avatar = avatar ? avatar : "N/A"

   return user;
}