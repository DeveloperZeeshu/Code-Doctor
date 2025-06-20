import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const { body: prompt } = await req.json();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  }
  catch (err) {
    console.log('Error Generating Gemini response: ', err);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
};




