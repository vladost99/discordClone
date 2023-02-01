import { store } from "redux/store";
import { setOpenRoom, setIsUserJoinedWithOnlyAudio, setRoomDetails, setActiveRooms, setLocalStream, setAudioOnly, setRemoteStream, setScreenSharing } from 'redux/room/slice';
import { getAudiOnly, getRemoteStreams, getRoomID, getScreenSharingStream } from "./selector";
import { getFriends } from "redux/friends/selector";
import { PeersConn } from "socket/peers";
import RoomEmitter from "socket/emitters/RoomEmitter";
import webRTCHandler from 'socket/webRTCHandler';
import { getUserId } from "redux/user/selector";

class RoomHandlers {
    create() {
      const audioOnly = getAudiOnly();
      store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));
      store.dispatch(setOpenRoom({isUserRoomCreator: true, isUserInRoom: true}));
      RoomEmitter.createRoom();
    }
    prepareCreateRoom() {
      const audioOnly = getAudiOnly()
      webRTCHandler.getLocalStreamPreview(audioOnly, () => {this.create()});
    }
    leave() {
      const roomId = getRoomID();  
      store.dispatch(setOpenRoom({isUserRoomCreator: false, isUserInRoom: false}));
      store.dispatch(setRoomDetails({roomDetails: null}));
      webRTCHandler.stopLocalStream();
      this.setScreenSharingStream(null, null);
      RoomEmitter.leave({roomId});
      store.dispatch(setRemoteStream([]));
    }
    join(roomId) {
      const audioOnly = getAudiOnly();
      store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));
      store.dispatch(setRoomDetails({roomDetails: {roomId}}));
      store.dispatch(setOpenRoom({ isUserRoomCreator: false, isUserInRoom: true }));
      RoomEmitter.join({ roomId });
    }
    prepareJoin(roomId) {
      const audioOnly = getAudiOnly();
      webRTCHandler.getLocalStreamPreview(audioOnly, () => { this.join(roomId)});
    }
    setActiveRooms(data) {
      const friends =  getFriends();
      const activeRooms = data.activeRooms;
      const rooms = [];

      const userId = getUserId();

      activeRooms.forEach(r => {
          const isRoomCreatedByMe = r.roomCreator.userId === userId;

          if(isRoomCreatedByMe) {
            rooms.push({...r, creatorUserName: 'Me'});
          }
           else {
              friends.forEach(f => {
                if(f.id === r.roomCreator.userId) {
                    rooms.push({...r, creatorUserName: f.name});
                }
            })
           }
      })

     
      store.dispatch(setActiveRooms(rooms));
    }
    setLocStream(stream) {
      store.dispatch(setLocalStream({stream}));
    }
    setAudio(value) {
      store.dispatch(setAudioOnly(value));
    }
    addRemoveStream(data) {
      const remoteStreams = getRemoteStreams();
      store.dispatch(setRemoteStream([...remoteStreams, data]));
    }
    handleParticipantLeftRoom(data) {
      const { connUserSocketId } = data;
      
      if(PeersConn.isExists(connUserSocketId)) {
        PeersConn.destroy(connUserSocketId);
      }

      const remoteStreams = getRemoteStreams();
      const newRemoteStreams = remoteStreams.filter(remoteStream => remoteStream.connUserSocketId !== connUserSocketId);

      store.dispatch(setRemoteStream(newRemoteStreams));

    }
    setScreenSharingStream(stream, localStream = null) {

      if(stream && !localStream) {
        PeersConn.switchOutgoingTracks(stream);
      }
      if(!stream && localStream) {
        getScreenSharingStream().getTracks().forEach(track => {
          track.stop();
        });
        PeersConn.switchOutgoingTracks(localStream);
      }

      if(!stream && !localStream) {
        if(getScreenSharingStream()) {
          getScreenSharingStream().getTracks().forEach(track => {
            track.stop();
          });
        }
      }

      store.dispatch(setScreenSharing(
        {
        isScreenSharingActive: stream ? true : false,
        screenSharingFunctionality: stream || null
        }
        ));
    }
}

export default new RoomHandlers();