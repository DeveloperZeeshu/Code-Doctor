export const getBugReportPrompt = ({ code, description, environment, severity, steps }) => {
  return `
You are acting as a **professional QA engineer and software developer**.

Your task is to generate a **clear, professional, and structured bug report** based on the information provided below.  
Output must strictly follow the **key-value Markdown format** shown in the template below.

---

### Bug Report Input

**Code Snippet (if available):**
\`\`\`js
${code || '// No code snippet provided'}
\`\`\`

**Bug Description:**
${description || '_No description provided._'}

**Steps to Reproduce:**
${steps || '_Steps not specified._'}

**Environment (Browser/OS/Device/etc):**
${environment || '_Not specified._'}

**Severity:**
${severity || 'Medium'}

---

### Output Format Instructions

Generate the final report in **Markdown**, using this exact structure:

\`\`\`md
**Bug Title**: [Short, descriptive title]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [...]

**Expected Behavior**: [What should happen]

**Actual Behavior**: [What actually happens]

**Environment Info**: [Browser/OS/Framework/Version details]

**Severity Level**: [As provided, with brief justification]

**Additional Notes or Suggestions**: [Optional improvements or causes]
\`\`\`

---

### Important Guidelines
- Do **not** include section headings like "### 1." — only use bold keys as shown above.  
- Do **not** add any commentary, introductions, or explanations outside the structured report.  
- Keep the tone **formal, QA-focused, and concise**.
- Use **Markdown formatting** only (no plain text or JSON).

Generate **only** the structured report content in Markdown.
`;
};
