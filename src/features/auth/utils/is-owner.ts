import { User } from "@prisma/client";

type Entity = {
    userId: string | null;
  };

  type SimpleUser = {
    id: string;
  };
  



// export const isOwner = (
//   authUser: User | null | undefined,
//   entity: Entity | null | undefined
// ) => {
//     if (!authUser || !entity) {
//       return false;
//     }
  
//     if (!entity.userId) {
//       return false;
//     }
  
//     if (entity.userId !== authUser.id) {
//       return false;
//     } else {
//       return true;
//     }
//   };

export const isOwner = (
    authUser: SimpleUser | null | undefined,
    entity: Entity | null | undefined
  ) => {
    if (!authUser || !entity) {
      return false;
    }
  
    if (!entity.userId) {
      return false;
    }
  
    return entity.userId === authUser.id;
  };