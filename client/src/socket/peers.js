import Peer from 'simple-peer';
import RoomEmitter from './emitters/RoomEmitter';
import RoomHandlers from 'redux/room/handlers';

class Peers {
    peers = {};
    
    getPeers() {
        return this.peers;
    }
    getPeersById(socketId) {
        return this.peers[socketId];
    }
    addNewPeer(socketId, isInitiator, localStream) {
        this.peers[socketId] = new Peer({
            initiator: isInitiator,
            config: this.getConfiguration(),
            stream: localStream
        });

        this.peers[socketId].on('signal', data => {
            const signalData = {
                signal: data,
                connUserSocketId: socketId
            };
            RoomEmitter.signalPeerData(signalData);
        });

        this.peers[socketId].on('stream', (remoteStream) => {
            //add new remote steam to our server store
            console.log(`remote stream came from other user`);
            console.log(`direct connection has been established`);
            remoteStream.connUserSocketId = socketId;
            RoomHandlers.addRemoveStream(remoteStream);
        })
    }
    isExists(socketId) {
        return this.peers[socketId] ? true : false;
    }
    destroy(socketId) {
        this.peers[socketId].destroy();
        delete this.peers[socketId];
    }
    signal(socketId, signal) {
        this.peers[socketId].signal(signal);
    }
    getConfiguration() {
        const turnIceServers = null;
    
        if(turnIceServers) {
            //todo use TURN server credentials
        }
        else {
            console.warn('Using only STUN server');
            return {
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    }
                ],
    
            }
        }
    }
    switchOutgoingTracks(stream)  {
        for(let socket_id in this.peers) {
            for(let index in this.peers[socket_id].streams[0].getTracks()) {
                for(let index2 in stream.getTracks()) {

                    if(this.peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                        this.peers[socket_id].replaceTrack(
                            this.peers[socket_id].streams[0].getTracks()[index],
                            stream.getTracks()[index2],
                            this.peers[socket_id].streams[0]
                        );
                        break;
                    }

                }
            }
        }
    }
    
}


export const PeersConn = new Peers();