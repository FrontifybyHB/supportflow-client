import { JSX, useState } from "react";

const ChatWidget = (): JSX.Element => {
  const [messages, setMessages] = useState<string[]>([
    "I've analyzed your logs. OAuth token expired.",
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-[350px] bg-[#0e2037] rounded-xl shadow-2xl flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between">
        <span>Aegis AI Assistant</span>
        ✖
      </div>

      {/* Messages */}
      <div className="p-4 h-64 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="bg-[#192b42] p-2 rounded">
            {msg}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#091c32] px-3 py-2 rounded"
          placeholder="Type..."
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-400 text-black px-3 rounded"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;