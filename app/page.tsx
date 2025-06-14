"use client";
import { useState, useEffect, useRef } from "react";

// Define message types
interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  type: "text" | "location" | "voice" | "emoji";
  duration?: number; // for voice messages
  location?: {
    latitude: number;
    longitude: number;
  };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock initial messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        text: "你好！欢迎使用聊天应用 👋",
        timestamp: new Date(Date.now() - 300000),
        isOwn: false,
        type: "text",
      },
      {
        id: "2",
        text: "这个界面看起来很棒！",
        timestamp: new Date(Date.now() - 240000),
        isOwn: true,
        type: "text",
      },
      {
        id: "3",
        text: "你可以发送文字、表情、位置和语音消息",
        timestamp: new Date(Date.now() - 180000),
        isOwn: false,
        type: "text",
      },
      {
        id: "4",
        text: "😊 太棒了！",
        timestamp: new Date(Date.now() - 120000),
        isOwn: true,
        type: "emoji",
      },
    ];
    setMessages(mockMessages);
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Send message function
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        timestamp: new Date(),
        isOwn: true,
        type:
          inputText.includes("😊") ||
          inputText.includes("😄") ||
          inputText.includes("😍") ||
          inputText.includes("🎉") ||
          inputText.includes("❤️") ||
          inputText.includes("👍") ||
          inputText.includes("🔥") ||
          inputText.includes("💯")
            ? "emoji"
            : "text",
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText("");

      // Simulate typing indicator and auto response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const responses = [
            "收到！👍",
            "好的，我明白了",
            "有什么可以帮助你的吗？",
            "😊 很高兴和你聊天",
            "这个功能很实用呢！",
            "你说得对！",
          ];
          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];

          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            timestamp: new Date(),
            isOwn: false,
            type:
              randomResponse.includes("😊") || randomResponse.includes("👍")
                ? "emoji"
                : "text",
          };

          setMessages(prev => [...prev, responseMessage]);
          setIsTyping(false);
        }, 1500);
      }, 500);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Send location
  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const locationMessage: Message = {
            id: Date.now().toString(),
            text: `📍 我的位置：纬度 ${position.coords.latitude.toFixed(
              6
            )}，经度 ${position.coords.longitude.toFixed(6)}`,
            timestamp: new Date(),
            isOwn: true,
            type: "location",
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
          setMessages(prev => [...prev, locationMessage]);
        },
        () => {
          // Fallback to mock location
          const mockLocationMessage: Message = {
            id: Date.now().toString(),
            text: `📍 我的位置：纬度 39.904200，经度 116.407396 (模拟位置)`,
            timestamp: new Date(),
            isOwn: true,
            type: "location",
            location: {
              latitude: 39.9042,
              longitude: 116.407396,
            },
          };
          setMessages(prev => [...prev, mockLocationMessage]);
        }
      );
    } else {
      // Fallback for browsers without geolocation
      const mockLocationMessage: Message = {
        id: Date.now().toString(),
        text: `📍 我的位置：纬度 39.904200，经度 116.407396 (模拟位置)`,
        timestamp: new Date(),
        isOwn: true,
        type: "location",
        location: {
          latitude: 39.9042,
          longitude: 116.407396,
        },
      };
      setMessages(prev => [...prev, mockLocationMessage]);
    }
  };

  // Send voice message (mock)
  const sendVoiceMessage = () => {
    const voiceMessage: Message = {
      id: Date.now().toString(),
      text: "🎤 语音消息",
      timestamp: new Date(),
      isOwn: true,
      type: "voice",
      duration: Math.floor(Math.random() * 30) + 5, // Random duration 5-35 seconds
    };
    setMessages(prev => [...prev, voiceMessage]);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex flex-col'>
      {/* Header */}
      <div className='bg-white/90 backdrop-blur-sm border-b border-indigo-100 px-4 py-3 shadow-sm'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>💬</span>
            </div>
            <div>
              <h1 className='text-xl font-bold text-slate-800'>智能聊天</h1>
              <p className='text-sm text-slate-500'>在线聊天应用</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-sm text-slate-600'>在线</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className='flex-1 overflow-hidden'>
        <div className='max-w-4xl mx-auto h-full flex flex-col'>
          <div className='flex-1 overflow-y-auto px-4 py-6 space-y-4'>
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md ${
                    message.isOwn ? "order-2" : "order-1"
                  }`}
                >
                  {/* Message bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.isOwn
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md"
                        : "bg-white/90 text-slate-800 rounded-bl-md border border-slate-200"
                    } ${message.type === "emoji" ? "text-2xl" : ""}`}
                  >
                    {message.type === "voice" ? (
                      <div className='flex items-center space-x-3'>
                        <button className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'>
                          <span className='text-sm'>▶️</span>
                        </button>
                        <div className='flex-1'>
                          <div className='flex space-x-1 items-center'>
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 bg-white/60 rounded-full ${
                                  i % 3 === 0
                                    ? "h-4"
                                    : i % 2 === 0
                                    ? "h-3"
                                    : "h-2"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className='text-xs opacity-75'>
                          {message.duration}s
                        </span>
                      </div>
                    ) : message.type === "location" ? (
                      <div className='flex items-center space-x-2'>
                        <span className='text-2xl'>📍</span>
                        <div>
                          <div className='font-medium'>我的位置</div>
                          <div className='text-xs opacity-75'>
                            {message.location &&
                              `${message.location.latitude.toFixed(
                                4
                              )}, ${message.location.longitude.toFixed(4)}`}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          message.type === "emoji" ? "animate-bounce" : ""
                        }
                      >
                        {message.text}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div
                    className={`text-xs text-slate-500 mt-1 ${
                      message.isOwn ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className='flex justify-start'>
                <div className='max-w-xs lg:max-w-md'>
                  <div className='bg-white/90 text-slate-800 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-200 shadow-sm'>
                    <div className='flex space-x-1'>
                      <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce'></div>
                      <div
                        className='w-2 h-2 bg-slate-400 rounded-full animate-bounce'
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className='w-2 h-2 bg-slate-400 rounded-full animate-bounce'
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                  <div className='text-xs text-slate-500 mt-1'>正在输入...</div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className='bg-white/90 backdrop-blur-sm border-t border-indigo-100 px-4 py-4 shadow-lg'>
        <div className='max-w-4xl mx-auto'>
          {/* Quick Actions */}
          <div className='flex space-x-2 mb-3 overflow-x-auto pb-2'>
            <button
              onClick={sendLocation}
              className='flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors whitespace-nowrap'
            >
              <span>📍</span>
              <span>位置</span>
            </button>
            <button
              onClick={sendVoiceMessage}
              className='flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors whitespace-nowrap'
            >
              <span>🎤</span>
              <span>语音</span>
            </button>
            <button
              onClick={() => setInputText(inputText + "😊")}
              className='flex items-center space-x-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors whitespace-nowrap'
            >
              <span>😊</span>
              <span>表情</span>
            </button>
            <button
              onClick={() => setInputText(inputText + "👍")}
              className='flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors whitespace-nowrap'
            >
              <span>👍</span>
              <span>赞</span>
            </button>
            <button
              onClick={() => setInputText(inputText + "❤️")}
              className='flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200 transition-colors whitespace-nowrap'
            >
              <span>❤️</span>
              <span>爱心</span>
            </button>
          </div>

          {/* Input Box */}
          <div className='flex items-end space-x-3'>
            <div className='flex-1 relative'>
              <input
                ref={inputRef}
                type='text'
                placeholder='输入消息...'
                className='w-full px-4 py-3 pr-12 border-2 border-indigo-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 text-slate-700 placeholder-slate-400 bg-white/90 resize-none'
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {inputText && (
                <button
                  onClick={() => setInputText("")}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                inputText.trim()
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
