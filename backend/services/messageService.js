class MessageService {
    formatMessage(data, typeMessage = 'DIRECT') {
        return {
            content: data.content,
            author: data.userId,
            date: new Date(),
            type: typeMessage
        }
    }
    formatDirectMessage(data) {
        return this.formatMessage(data, 'DIRECT');
    }
}

module.exports = new MessageService();