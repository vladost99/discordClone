const modelCounters = require("../models/counters");

class CountersService {
  async create(userId, receiverId, conversationId) {
    return modelCounters.create({
      conversation_id: conversationId,
      participants: [userId, receiverId],
      unreadMessages: [
        {
          user: userId,
          count: 0,
        },
        {
          user: receiverId,
          count: 0,
        },
      ],
    });
  }
  async findCounters(convId) {
    return modelCounters.findOne({
      conversation_id: convId,
    });
  }
  async findCountersByParticipant(userId, receiverId) {
    return modelCounters.findOne({
      participants: { $all: [userId, receiverId] },
    });
  }
  async updateIncrease(userId, convId) {
    const counters = await this.findCounters(convId);
    counters.unreadMessages = counters.unreadMessages.map((c) => {
      if (c.user === userId) {
        c.count += 1;
      }
      return c;
    });
    await counters.save();

    return counters;
  }
  async reset(userId, convId) {
    const counters = await this.findCounters(convId);
    counters.unreadMessages = counters.unreadMessages.map((c) => {
      if (c.user === userId) {
        c.count = 0;
      }
      return c;
    });
    await counters.save();

    return counters;
  }
}

module.exports = new CountersService();
