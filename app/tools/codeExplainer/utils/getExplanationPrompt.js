export const getExplanationPrompt = (code, level) => {
  const prompt = `
You are an expert programming instructor.

Your task is to explain the following code in a **${level || 'clear and understandable'}** manner.

Guidelines:
- Tailor the explanation to a **${level || 'beginner'}** level audience.
- Clarify what the code does step-by-step.
- Break down any complex or tricky parts.
- Highlight key concepts, logic, and flow.

**Formatting Rules**:
- Use **Markdown**
- Use **bold** for emphasis and section headings
- Use \`\`\` for code blocks
- Separate the **explanation** and the **code snippet**
- Be concise but clear

Respond only with explanation + code. Avoid extra commentary or apologies.

Code to explain:
\`\`\`
${code}
\`\`\`
  `;

  return prompt;
};

