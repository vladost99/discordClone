import { store } from 'redux/store';
import { setRoomDetails } from 'redux/room/slice';
import RoomHandlers from 'redux/room/handlers';
import RoomEmitter from 'socket/emitters/RoomEmitter';
import webRTCHandler from 'socket/webRTCHandler';

class RoomListeners {
    turnOnListeners(socket) {
        this.listenRoomCreate(socket);
        this.listenActiveRooms(socket);
        this.listenConnPrepare(socket);
        this.listenConnInit(socket);
        this.listenConnSignal(socket);
        this.listenRoomParticipantLeft(socket);
    }

    listenRoomCreate(io) {
        io.on('room-create', data => {
           store.dispatch(setRoomDetails(data));
        })
    }
    listenActiveRooms(io) {
        io.on('active-rooms', data => {
            RoomHandlers.setActiveRooms(data);
        })
    }
    listenConnPrepare(io) {
        io.on('conn-prepare', data => {
           webRTCHandler.prepareNeewPeerConnection(data.connUserSocketId, false);
           RoomEmitter.connectionInit({connUserSocketId: data.connUserSocketId});
        });
    }
    listenConnInit(io) {
        io.on('conn-init', data => {
            webRTCHandler.prepareNeewPeerConnection(data.connUserSocketId, true);
        })
    }
    listenConnSignal(io) {
        io.on('conn-signal', data => {
            webRTCHandler.handleSignalingData(data);
        });
    }
    listenRoomParticipantLeft(io) {
        io.on('room-participant-left', data => {
            RoomHandlers.handleParticipantLeftRoom(data);
        });
    }
}

export default new RoomListeners();