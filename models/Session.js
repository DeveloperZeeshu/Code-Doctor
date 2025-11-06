import mongoose from "mongoose"

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valid: { type: Boolean, default: false },
    userAgent: { type: String, required: true },
    ip: { type: String, required: true }
},
    {
        timestamps: true
    }
)

const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema)

export default Session

