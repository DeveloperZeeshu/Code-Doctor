export const extractBugReportData = (rawText) => {
    const extract = (label) => {
        const regex = new RegExp(`\\*\\*${label}\\*\\*:\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`, 'i')
        const match = rawText.match(regex);
        return match ? match[1].trim() : '';
    }

    return {
        title: extract('Bug Title'),
        steps: extract('Steps to Reproduce'),
        expBehavior: extract('Expected Behavior'),
        actBehavior: extract('Actual Behavior'),
        envInfo: extract('Environment Info'),
        severity: extract('Severity Level'),
        additional: extract('Additional Notes or Suggestions')
    }
};

