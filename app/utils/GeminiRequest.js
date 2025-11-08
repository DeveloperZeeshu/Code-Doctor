'use client';

import axios from "axios";

export const getResponse = async (prompt) => {
  try {
    const response = await axios.post('/api/gemini', prompt)

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Unknown error occured');

    return data.output;

  }

  catch (err) {
    console.error('Error fetching Gemini response', err);
    return null;
  }
};













