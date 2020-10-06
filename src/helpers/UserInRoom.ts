const roomChat: any = [];

const roomNotify: { userId: string; socketId: string }[] = [];

export function jonRomChat(id: string): void {
  const findInRoomChat = roomChat.find(userId => {
    return userId === id;
  });

  // if (findInRoomChat) {
  //   return;
  // } else {
  //   roomChat.push(id);
  // }

  console.log(roomChat);
}

// Room notifi
export function joinNotify(user: { userId: string; socketId: string }): void {
  const findUserInNotify = roomNotify.find(
    (u: { userId: string; socketId: string }) => {
      return u.userId === user.userId && u.socketId === user.socketId;
    },
  );

  if (findUserInNotify) {
    return;
  } else {
    roomNotify.push(user);
  }

  const findUserInNotify2 = roomNotify.find(
    (u: { userId: string; socketId: string }) => {
      return u.userId === user.userId && u.socketId !== user.socketId;
    },
  );

  if (findUserInNotify2) {
    const indexOfUser = roomNotify.findIndex(
      (u: { userId: string; socketId: string }) => {
        return u.userId === user.userId;
      },
    );

    roomNotify.splice(indexOfUser, 1);
  }

  console.log(roomNotify);
}

export const checkUserInRoomNotify = (user: {
  userId: string;
  socketId: string;
}) => {
  const findUserInNotify = roomNotify.find(
    (u: { userId: string; socketId: string }) => {
      return u.userId === user.userId && u.socketId === user.socketId;
    },
  );
  return findUserInNotify;
};
