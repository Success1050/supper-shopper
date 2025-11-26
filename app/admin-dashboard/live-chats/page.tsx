"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  Heart,
} from "lucide-react";

// Types
interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
  typing?: boolean;
}

interface Message {
  id: string;
  sender: "You" | "Edward Listz";
  content: string;
  time: string;
  type: "text" | "missed-call" | "call-ended" | "typing";
}

// Sidebar Component
const Sidebar = ({
  chats,
  activeChat,
  onChatSelect,
}: {
  chats: Chat[];
  activeChat: string;
  onChatSelect: (id: string) => void;
}) => {
  const recentChats = chats.slice(0, 4);
  const allChats = chats;

  return (
    <div className="w-full lg:w-80 bg-[#2b2a54] h-screen flex flex-col mx-5">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h1 className="text-[#fff] text-xl font-semibold">Chats</h1>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-[#2723FF] transition">
            <Plus className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for Contacts or Messages"
            className="w-full bg-gray-100 text-[#fff] pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Recent Chats */}
      <div className="px-4 mb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-600 text-xs font-semibold uppercase">
            Recent Chats
          </h2>
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentChats.map((chat) => (
            <div
              key={chat.id}
              className="flex flex-col items-center gap-1 min-w-fit cursor-pointer"
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-semibold">
                  {chat.name.charAt(0)}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="text-xs text-gray-700">
                {chat.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All Chats - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 mb-2 flex items-center justify-between">
          <h2 className="text-gray-600 text-xs font-semibold uppercase">
            All Chats
          </h2>
          <Heart className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-1">
          {allChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`px-4 py-3 cursor-pointer transition hover:bg-gray-50 ${
                activeChat === chat.id ? "bg-[#38385f]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {chat.name.charAt(0)}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[#fff] text-sm font-medium truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm truncate flex items-center gap-1">
                      {chat.typing && (
                        <span className="text-green-500">is typing</span>
                      )}
                      {!chat.typing && chat.lastMessage}
                    </p>
                    {chat.unread && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Chat Window Component
const ChatWindow = ({
  messages,
  currentUser,
}: {
  messages: Message[];
  currentUser: string;
}) => {
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="flex-1 flex flex-col bg-[#2b2a54] h-screen">
      {/* Header - Fixed */}
      <div className="bg-[#2b2a54] p-4 border-b border-[#201d4c] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              E
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-[#fff] font-semibold">{currentUser}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#2b2a54] min-h-0">
        <div className="flex justify-center mb-6">
          <span className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-full">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <div key={message.id}>
            {message.type === "text" && (
              <div
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-md">
                  {message.sender !== "You" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      E
                    </div>
                  )}
                  <div>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === "You"
                          ? "bg-white text-gray-800 shadow-sm"
                          : "bg-white text-gray-800 shadow-sm"
                      }`}
                    >
                      {message.sender !== "You" && (
                        <div className="text-xs text-gray-500 mb-1">
                          {message.sender}
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-2">
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                      {message.sender === "You" && (
                        <svg
                          className="w-3 h-3 text-blue-500"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 2.854 8.146a.5.5 0 1 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  {message.sender === "You" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      Y
                    </div>
                  )}
                </div>
              </div>
            )}

            {message.type === "missed-call" && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                    E
                  </div>
                  <div className="bg-white shadow-sm px-4 py-3 rounded-2xl max-w-xs">
                    <div className="flex items-center gap-2 text-red-500">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          Missed Audio Call
                        </div>
                        <div className="text-xs text-gray-500">
                          {message.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {message.type === "call-ended" && (
              <div className="flex justify-end">
                <div className="bg-blue-500 px-4 py-2 rounded-full text-white text-sm flex items-center gap-2 shadow-sm">
                  <Phone className="w-4 h-4" />
                  <span>Audio Call Ended</span>
                  <span className="text-xs">{message.time}</span>
                </div>
              </div>
            )}

            {message.type === "typing" && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                    E
                  </div>
                  <div className="bg-white shadow-sm px-4 py-3 rounded-2xl">
                    <div className="text-gray-600 text-sm">is typing ...</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input - Fixed */}
      <div className="bg-[#2b2a54] p-4 border-t flex-shrink-0">
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type Your Message"
            className="flex-1 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
          <button className="w-10 h-10 rounded-full bg-blue-500 hover:bg-[#2723FF] flex items-center justify-center transition">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function ChatApp() {
  const [activeChat, setActiveChat] = useState("1");
  const [showSidebar, setShowSidebar] = useState(false);

  const chats: Chat[] = [
    {
      id: "1",
      name: "Nickel",
      avatar: "N",
      lastMessage: "Photo",
      time: "02:30 PM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Titus",
      avatar: "T",
      lastMessage: "Haha oh man",
      time: "12:40 AM",
      online: true,
    },
    {
      id: "3",
      name: "Geoffrey",
      avatar: "G",
      lastMessage: "woohoo!",
      time: "08:12 AM",
      online: false,
    },
    {
      id: "4",
      name: "Laverty",
      avatar: "L",
      lastMessage: "omg, this is",
      time: "06:12 AM",
      online: false,
    },
    {
      id: "5",
      name: "Aaryan Jose",
      avatar: "A",
      lastMessage: "is typing ...",
      time: "02:30 PM",
      unread: 2,
      typing: true,
    },
    {
      id: "6",
      name: "Sarika Jain",
      avatar: "S",
      lastMessage: "Do you know wh",
      time: "08:12 AM",
    },
    {
      id: "7",
      name: "Clyde Smith",
      avatar: "C",
      lastMessage: "haha oh man 🔥",
      time: "03:15 AM",
      unread: 7,
    },
    {
      id: "8",
      name: "Amit_boys_Group",
      avatar: "A",
      lastMessage: "Photo",
      time: "Yesterday",
      unread: 5,
    },
    {
      id: "9",
      name: "Garla Jenkins",
      avatar: "G",
      lastMessage: "Incoming Video Call",
      time: "Sunday",
    },
    {
      id: "10",
      name: "Federico Walls",
      avatar: "F",
      lastMessage: "Photo",
      time: "Wednesday",
      unread: 2,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "Edward Listz",
      content: "Thanks for Sharing!!! Can we have a call??",
      time: "02:30 PM",
      type: "text",
    },
    {
      id: "2",
      sender: "You",
      content: "Yes Please",
      time: "02:32 PM",
      type: "text",
    },
    {
      id: "3",
      sender: "Edward Listz",
      content: "",
      time: "01 MIN 26 Sec",
      type: "missed-call",
    },
    {
      id: "4",
      sender: "You",
      content: "",
      time: "07 MIN 45 Sec",
      type: "call-ended",
    },
    { id: "5", sender: "Edward Listz", content: "", time: "", type: "typing" },
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          showSidebar ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowSidebar(false)}
        ></div>
        <div className="absolute left-0 top-0 bottom-0 w-80 bg-white">
          <Sidebar
            chats={chats}
            activeChat={activeChat}
            onChatSelect={(id) => {
              setActiveChat(id);
              setShowSidebar(false);
            }}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          chats={chats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
        />
      </div>

      {/* Chat Window */}
      <ChatWindow messages={messages} currentUser="Edward Listz" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowSidebar(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-lg z-40"
      >
        <MoreVertical className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
