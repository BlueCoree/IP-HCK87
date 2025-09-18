const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({});

const geminiAPI = async (prompt) => {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });
  console.log(response.text);
}

module.exports = geminiAPI;
