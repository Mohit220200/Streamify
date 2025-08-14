// backend/src/seed.js

import { connect } from "mongoose";
import { hash } from "bcryptjs";
import { config } from "dotenv";
config();

import User, { deleteMany } from "./models/User";
import FriendRequest, { deleteMany as _deleteMany } from "./models/FriendRequest";

const MONGO_URI = process.env.MONGO_URI;

async function seedDB() {
  try {
    await connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing users and friend requests
    await deleteMany({});
    await _deleteMany({});
    console.log("🧹 Old data deleted");

    // Hash passwords
    const hashedPassword1 = await hash("123456", 10);
    const hashedPassword2 = await hash("123456", 10);

    // Create users
    const user1 = new User({
      fullName: "Alice",
      email: "alice@example.com",
      password: hashedPassword1,
    });

    const user2 = new User({
      fullName: "Bob",
      email: "bob@example.com",
      password: hashedPassword2,
    });

    await user1.save();
    await user2.save();
    console.log("👥 Users created");

    // Create accepted friend request between them
    const friendRequest = new FriendRequest({
      sender: user1._id,
      recipient: user2._id,
      status: "accepted",
    });

    await friendRequest.save();
    console.log("✅ Friend request created");

    console.log("🌱 Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();
