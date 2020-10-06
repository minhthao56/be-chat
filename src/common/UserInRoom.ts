const roomChat: [] = [];

const roomNotify: [] = [];

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

export function joinNotify(user: { userId: string; socketId: string }): void {
  const findUserInNotify = roomNotify.filter(
    (u: { userId: string; socketId: string }) => {
      return u.userId === user.userId && u.socketId === u.socketId;
    },
  );
  if (findUserInNotify.length) {
    return;
  } else {
    roomNotify.push(user);
  }

  return;
}
