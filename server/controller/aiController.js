const { OpenAI } = require("openai");

const openai = new OpenAI();
const aiController = {};

aiController.generateMessage = async (req, res, next) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Generate a creative description for our upcoming event.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    res.locals.response = completion.choices[0];
    return next();
  } catch (e) {
    const error = new Error("Internal Server Error");
    error.status = 500;
    return next(error);
  }
};

module.exports = { aiController };
