
const conf = {
    mongoDbUri: String(process.env.MONGODB_URI),
    geminiApiKey: String(process.env.GEMINI_API_KEY),
    jwtSecret: String(process.env.JWT_SECRET)
}

export default conf
