import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI is not defined");
}

export async function connectDB() {
	if (global.mongooseConn) {
		return global.mongooseConn;
	}

	global.mongooseConn = mongoose.connect(MONGODB_URI, {
		bufferCommands: false,
	});

	return global.mongooseConn;
}
