'use client';

export const getResponse = async (prompt) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ body: prompt }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Unknown error occured');
    return data.output;
  }

  catch (err) {
    console.error('Error fetching Gemini response', err);
    return null;
  }
};













