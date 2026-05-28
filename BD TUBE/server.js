const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { updateWatchReward } = require('./controllers/rewardController');

// এনভায়রনমেন্ট ভেরিয়েবল লোড করা
dotenv.config();

const app = express();

// মিডলওয়্যার (Json ডাটা রিড করার জন্য)
app.use(express.json());

// ডাটাবেজ কানেকশন (MongoDB)
// আপনার .env ফাইলে MONGO_URI না থাকলে সরাসরি এখানে টেস্ট লিংক দেওয়া যাবে
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:21017/premiumbdtube';
mongoose.connect(mongoURI)
  .then(() => console.log('🟢 MongoDB ডাটাবেজ সফলভাবে কানেক্ট হয়েছে!'))
  .catch(err => console.error('🔴 ডাটাবেজ কানেকশনে সমস্যা:', err));

// 🚀 বেসিক রাউট (টেস্ট করার জন্য)
app.get('/', (req, res) => {
  res.send('Premium Video Platform Backend is Running! 🚀');
});

// 🔒 ওয়াচ-টু-আর্ন এবং ক্যাপচা লজিক এপিআই এন্ডপয়েন্ট
app.post('/api/reward/update', updateWatchReward);

// সার্ভার পোর্ট সেটআপ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 সার্ভার সফলভাবে চালু হয়েছে! পোর্ট নম্বর: ${PORT}`);
});
