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

export function EX(): void {
  return;
}
