export const getBugReportPrompt = ({ code, description, environment, severity, steps }) => {
  return `
You are acting as a **professional QA engineer and software developer**.

Your task is to generate a **clear, professional, and structured bug report** based on the information provided below. Output should be in **Markdown format**, following standard QA/reporting practices.

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

### Output Instructions

Please structure your report as follows:

1. **Bug Title** - A short, descriptive title
2. **Steps to Reproduce** - Numbered steps, minimal but complete
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment Info** - System/browser/framework/version details
6. **Severity Level** - As provided, with justification if needed
7. **Additional Notes or Suggestions** - Optional

Use **Markdown formatting** (e.g., \`code blocks\`, bullet points, bold text). Ensure the tone is formal, precise, and QA-focused.

Generate only the bug report — avoid personal comments, apologies, or unrelated suggestions.
`;
};

