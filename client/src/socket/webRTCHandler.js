import RoomHandlers from 'redux/room/handlers';
import { getLocalStream } from 'redux/room/selector';
import { PeersConn } from './peers';

class webRTCHandler{
    onlyAudioConstrains = {
        audio: true,
        video: false
    }
    defaultConstrains = {
        audio: true,
        video: true
    }

   async getLocalStreamPreview(onlyAudio = false, callback) {
        const constrains = onlyAudio ? this.onlyAudioConstrains : this.defaultConstrains;
        
        console.log('contrains', constrains);
        try {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            const stream = await navigator.mediaDevices.getUserMedia(constrains);
            RoomHandlers.setLocStream(stream);

            callback();
        }
        catch(err) {
            console.log('err stream', err);
            console.log(`Cannot get an access to local stream`);
        }
    }
    stopLocalStream() {
        const stream = getLocalStream();

        if(stream) {
            stream.getTracks().forEach(track => track.stop());
            RoomHandlers.setLocStream(null);
            this.closeAllConnections();
        }
    }
    closeAllConnections() {
        const peers = PeersConn.getPeers;

        Object.entries(peers).forEach(mappedObject => {
            const connUserSocketId = mappedObject[0];
            
            if(PeersConn.isExists(connUserSocketId)) {
                PeersConn.destroy(connUserSocketId);
            }
        })
    }

    prepareNeewPeerConnection(connUserSocketId, isInitiator) {
        const localStream = getLocalStream();

        if(isInitiator) {
            console.log('preparing new peer connection as initiator');
        }
        else {
            console.log(`preparing new peer connection as not initiator`);
        }

        PeersConn.addNewPeer(connUserSocketId, isInitiator, localStream);
    }
    handleSignalingData(data) {
        const { connUserSocketId, signal } = data;

        if(PeersConn.getPeersById(connUserSocketId)) {
            PeersConn.signal(connUserSocketId, signal);
        }
        
    }
    
}

export default new webRTCHandler();