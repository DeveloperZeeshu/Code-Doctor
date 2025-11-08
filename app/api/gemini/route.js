import { GoogleGenerativeAI } from "@google/generative-ai";
import { error, success } from "../../../lib/response.js";
import conf from "../../../conf/conf.js";


export const POST = async (req) => {
  try {
    const genAi = new GoogleGenerativeAI(conf.geminiApiKey)
    const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const { prompt } = await req.json();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    if(!output)
      return error('Error fetching output.',500)

    return success(output, '', 200)
  }
  catch (err) {
    console.log('Error Generating Gemini response: ', err);
    error('Failed to generate response', 500)
  }
};




