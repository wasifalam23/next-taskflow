import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI!;

if (!mongoUri) {
	throw new Error('MONGODB_URI is not defined');
}

declare global {
	var mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDB() {
	if (global.mongooseConn) {
		return global.mongooseConn;
	}

	global.mongooseConn = mongoose.connect(mongoUri, {
		bufferCommands: false,
	});

	return global.mongooseConn;
}
