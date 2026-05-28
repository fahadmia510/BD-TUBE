const Wallet = require('../models/Wallet');

exports.updateWatchReward = async (req, res) => {
  const { userId, watchTimeSeconds } = req.body;
  const DAILY_LIMIT_SECONDS = 7200; // ২ ঘণ্টা সর্বোচ্চ লিমিট

  try {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId });
    }

    // ১. দৈনিক রিওয়ার্ড লিমিট চেক
    if (wallet.dailyWatchTimeSec >= DAILY_LIMIT_SECONDS) {
      return res.status(400).json({ message: "আপনার আজকের আয়ের দৈনিক সীমা শেষ!" });
    }

    // ২. স্মার্ট ক্যাপচা ট্রিগার লজিক (ধরি, প্রতি ১ ঘণ্টা বা ৩৬০০ সেকেন্ড পর পর)
    if (wallet.dailyWatchTimeSec > 0 && wallet.dailyWatchTimeSec % 3600 === 0) {
      return res.status(200).json({ 
        triggerCaptcha: true, 
        message: "অনুগ্রহ করে ক্যাপচা পূরণ করুন প্রমাণ করতে যে আপনি রোবট নন।" 
      });
    }

    // ৩. পয়েন্ট ও ওয়াচ টাইম আপডেট (ধরি, প্রতি ১০ মিনিটে ১০ পয়েন্ট)
    wallet.points += 10;
    wallet.dailyWatchTimeSec += watchTimeSeconds;
    wallet.lastUpdated = Date.now();
    await wallet.save();

    return res.status(200).json({ 
      triggerCaptcha: false, 
      currentPoints: wallet.points, 
      dailyWatchTime: wallet.dailyWatchTimeSec 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
