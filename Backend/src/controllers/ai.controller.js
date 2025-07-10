const aiService = require("../services/ai.service");

const getReview = async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).send("Missing code or language");
  }

  try {
    const prompt = `Language: ${language}\n\n${code}`;
    const review = await aiService(prompt);
    res.send(review);
  } catch (err) {
    console.error("Error in getReview:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getReview,
};
