import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.js";
import FriendRequest from "./models/FriendRequest.js";

// 1. Load environment variables
dotenv.config();

// 2. Connect to MongoDBs
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 3. Clear existing data
await User.deleteMany({});
await FriendRequest.deleteMany({});

// 4. Create hashed passwords
const hashedPassword1 = await bcrypt.hash("password123", 10);
const hashedPassword2 = await bcrypt.hash("password123", 10);

// 5. Create users
const user1 = new User({
  fullName: "Alice Johnson",
  email: "alice@example.com",
  password: hashedPassword1,
  nativeLanguage: "english",
  learningLanguage: "spanish",
  location: "New York",
});

const user2 = new User({
  fullName: "Carlos Garcia",
  email: "carlos@example.com",
  password: hashedPassword2,
  nativeLanguage: "spanish",
  learningLanguage: "english",
  location: "Madrid",
});

// 6. Save users
await user1.save();
await user2.save();

// 7. Create accepted friend request
const friendRequest = new FriendRequest({
  sender: user1._id,
  recipient: user2._id,
  status: "accepted",
});

await friendRequest.save();

console.log("✅ Seed data created successfully!");

process.exit(); // Exit process after seeding
