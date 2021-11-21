import fs from "fs/promises";
import path from "path";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface IChatroom {
  id: string;
  name: string;
  onlineCount: number;
  onlineUsers: IUser[];
}
interface IChat {
  id: string;
  userId: string;
  username: string;
  message: string;
  chatroomId: string;
  createdOn: string;
}
interface Versions {
  CHAT_ROOM: string;
  CHATS: Record<string, string>;
}
type Chatrooms = Record<string, IChatroom>;
type Chats = Record<string, IChat[]>;
interface DB {
  versions: Versions;
  chatrooms: Chatrooms;
  chats: Chats;
}
interface IUser {
  username: string;
  userId: string;
}

const SSE_INTERVAL = 100;

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const dbGet = async () => {
  const file = await fs.readFile(path.join(__dirname, "..", "_db.json"), {
    encoding: "utf-8",
  });
  const db: DB = JSON.parse(file);
  return db;
};

const dbPut = async (db: DB) => {
  await fs.writeFile(
    path.join(__dirname, "..", "_db.json"),
    JSON.stringify(db)
  );
  return dbGet();
};

app.get("/chats/sse/:chatroomId", (req, res) => {
  let localChatVersion: Versions["CHATS"] = {
    "cr-1": generateId(),
    "cr-2": generateId(),
    "cr-3": generateId(),
  };
  const chatroomId = req.params.chatroomId;
  res.set("Content-Type", "text/event-stream");
  res.set("Connection", "keep-alive");
  res.set("Cache-Control", "no-cache");
  console.log(`Client connected to chats sse - /chats/sse/${chatroomId}`);
  setInterval(async function () {
    const db = await dbGet();
    if (localChatVersion[chatroomId] !== db.versions["CHATS"][chatroomId]) {
      res.status(200).write(`data: UPDATE\n\n`);
      localChatVersion[chatroomId] = db.versions["CHATS"][chatroomId];
    }
  }, SSE_INTERVAL);
});

app.get("/chatrooms/sse", (req, res) => {
  let localChatVersion = generateId();
  res.set("Content-Type", "text/event-stream");
  res.set("Connection", "keep-alive");
  res.set("Cache-Control", "no-cache");
  console.log(`Client connected to chats sse - /chatrooms/sse`);
  setInterval(async function () {
    const db = await dbGet();
    if (localChatVersion !== db.versions["CHAT_ROOM"]) {
      res.status(200).write(`data: UPDATE\n\n`);
      localChatVersion = db.versions["CHAT_ROOM"];
    }
  }, SSE_INTERVAL);
});

app.post("/chatrooms/:chatroomId", async (req, res) => {
  const chatroomId = req.params.chatroomId;
  const user: IUser = req.body;
  const db = await dbGet();
  if (
    !db.chatrooms[chatroomId].onlineUsers.find(
      (u) => u.username.toLowerCase() === user.username.toLowerCase()
    )
  ) {
    db.chatrooms[chatroomId].onlineUsers.push(user);
    db.chatrooms[chatroomId].onlineCount++;
    db.versions["CHAT_ROOM"] = generateId();
  }
  const updatedDB = await dbPut(db);
  res.status(200).json(Object.values(updatedDB.chatrooms));
});

app.get("/chatrooms", async (req, res) => {
  const db = await dbGet();
  res.status(200).json(Object.values(db.chatrooms));
});

app.get("/chats/:chatroomId", async (req, res) => {
  const chatroomId = req.params.chatroomId;
  const db = await dbGet();
  res.status(200).json(db.chats[chatroomId]);
});

app.post("/chats", async (req, res) => {
  const chat: IChat = req.body;
  const db = await dbGet();
  db.chats[chat.chatroomId].push(chat);
  db.versions["CHATS"][chat.chatroomId] = generateId();
  await dbPut(db);
  res.status(200).json(chat);
});

// Global error handler, called automatically by express, gets err as the first arg
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
