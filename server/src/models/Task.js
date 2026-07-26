import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
