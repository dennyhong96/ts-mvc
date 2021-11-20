import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface IChatroom {
  id: string;
  name: string;
  onlineCount: number;
}

interface IChat {
  id: string;
  userId: string;
  username: string;
  message: string;
  chatroomId: string;
  createdOn: string;
}

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

let versions: {
  CHAT_ROOM: string;
  CHATS: Record<string, string>;
} = {
  CHAT_ROOM: generateId(),
  CHATS: {
    "cr-1": generateId(),
    "cr-2": generateId(),
    "cr-3": generateId(),
  },
};

const chatrooms: Record<string, IChatroom> = {
  "cr-1": { id: "cr-1", name: "Chatroom 1", onlineCount: 0 },
  "cr-2": { id: "cr-2", name: "Chatroom 2", onlineCount: 0 },
  "cr-3": { id: "cr-3", name: "Chatroom 3", onlineCount: 0 },
};

const chats: Record<string, IChat[]> = {
  "cr-1": [],
  "cr-2": [],
  "cr-3": [],
};

app.get("/chats/sse/:chatroomId", (req, res) => {
  let localChatVersion: Record<string, string> = {
    "cr-1": generateId(),
    "cr-2": generateId(),
    "cr-3": generateId(),
  };
  const chatroomId = req.params.chatroomId;
  res.set("Content-Type", "text/event-stream");
  res.set("Connection", "keep-alive");
  res.set("Cache-Control", "no-cache");
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Client connected to chats sse");
  setInterval(function () {
    if (localChatVersion[chatroomId] !== versions["CHATS"][chatroomId]) {
      res.status(200).write(`data: UPDATE\n\n`);
      localChatVersion[chatroomId] = versions["CHATS"][chatroomId];
    }
  }, 250);
});

app.get("/chatrooms/sse", (req, res) => {
  let localChatVersion = generateId();
  res.set("Content-Type", "text/event-stream");
  res.set("Connection", "keep-alive");
  res.set("Cache-Control", "no-cache");
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Client connected to chats sse");
  setInterval(function () {
    if (localChatVersion !== versions["CHAT_ROOM"]) {
      res.status(200).write(`data: UPDATE\n\n`);
      localChatVersion = versions["CHAT_ROOM"];
    }
  }, 250);
});

app.post("/chatrooms/:chatroomId", (req, res) => {
  const chatroomId = req.params.chatroomId;
  chatrooms[chatroomId].onlineCount++;
  versions["CHAT_ROOM"] = generateId();
  res.status(200).json(Object.values(chatrooms));
});

app.get("/chatrooms", (req, res) => {
  res.status(200).json(Object.values(chatrooms));
});

app.get("/chats/:chatroomId", (req, res) => {
  const chatroomId = req.params.chatroomId;
  res.status(200).json(chats[chatroomId]);
});

app.post("/chats", (req, res) => {
  const chat: IChat = req.body;
  chats[chat.chatroomId].push(chat);
  versions["CHATS"][chat.chatroomId] = generateId();
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
