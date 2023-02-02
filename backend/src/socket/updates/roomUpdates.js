const serverStore = require("../store");

class RoomUpdates {
  update(toSpecifiedTargetId = null) {
    const io = serverStore.getSocketServerInstance();
    const activeRooms = serverStore.getActiveRooms();

    // console.log('updates rooms', serverStore.getActiveRooms()[0].participants);

    if (toSpecifiedTargetId) {
      io.to(toSpecifiedTargetId).emit("active-rooms", { activeRooms });
    } else {
      io.emit("active-rooms", { activeRooms });
    }
  }
}

module.exports = new RoomUpdates();
