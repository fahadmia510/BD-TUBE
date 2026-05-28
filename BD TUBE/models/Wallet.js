const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, default: 0 }, // ভিউয়ারের রিওয়ার্ড পয়েন্ট
  earningsBDT: { type: Number, default: 0 }, // ক্রিয়েটরের টাকা (বিজ্ঞাপন থেকে)
  dailyWatchTimeSec: { type: Number, default: 0 }, // প্রতিদিন কত সেকেন্ড ভিডিও দেখল (সীমাবদ্ধতা রাখার জন্য)
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', WalletSchema);
