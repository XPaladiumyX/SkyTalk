import React, { useEffect, useRef, useState } from "react";

function ServerBar({ servers, active, onSelect }) {
  return (
    <div className="w-16 bg-[#0e1114] flex flex-col items-center py-3 gap-3 border-r border-black/20">
      {servers.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-transform hover:scale-105 focus:outline-none ${
            active === s.id
              ? "ring-2 ring-offset-2 ring-indigo-500 bg-gradient-to-br from-indigo-600 to-purple-600"
              : "bg-[#0b0d0f]"
          }`}
          title={s.name}
        >
          {s.short}
        </button>
      ))}

      <div className="mt-auto mb-2 flex flex-col gap-2">
        <button
          aria-label="Add server"
          className="w-10 h-10 rounded-md bg-emerald-500 text-black font-bold hover:brightness-110"
        >
          +
        </button>
      </div>
    </div>
  );
}

function ChannelList({ channels, active, onSelect }) {
  return (
    <aside className="w-72 bg-[#0b0f12] p-3 border-r border-black/20 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase text-gray-300">Text</h3>
        <button className="text-xs px-2 py-1 bg-[#0f1416] rounded hover:bg-[#111418]">
          +
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 text-sm">
        {channels.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#0e1417] ${
              active === c.id ? "bg-[#0d1720]" : ""
            }`}
          >
            <span className="text-indigo-300 font-medium">#</span>
            <span className="ml-1 text-gray-200">{c.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-400">Voice Channels</div>
      <div className="space-y-1 mt-2 text-sm text-gray-300">
        <div className="p-2 rounded hover:bg-[#0e1417]">🔊 Lobby</div>
      </div>
    </aside>
  );
}

function TopBar({ channelName, subtitle }) {
  return (
    <div className="h-16 px-4 flex items-center justify-between border-b border-black/20 bg-gradient-to-r from-[#0f1316] to-transparent">
      <div>
        <div className="text-sm font-semibold text-white">{channelName}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-300">
        <button className="px-2 py-1 rounded bg-[#111318] hover:bg-[#1a1f25]">
          Pinned
        </button>
        <button className="px-2 py-1 rounded bg-[#111318] hover:bg-[#1a1f25]">
          Search
        </button>
      </div>
    </div>
  );
}

function Message({ msg }) {
  return (
    <div className="flex gap-3 px-4 py-2 hover:bg-black/5 rounded">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold">
        {msg.author[0]}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <div className="text-sm font-semibold text-white">{msg.author}</div>
          <div className="text-xs text-gray-400">{msg.time}</div>
        </div>
        <div className="text-sm text-gray-200 mt-1">{msg.content}</div>
      </div>
    </div>
  );
}

function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.map((m) => (
          <Message key={m.id} msg={m} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function MessageInput({ onSend }) {
  const [value, setValue] = useState("");

  function handleSend() {
    const content = value.trim();
    if (!content) return;
    onSend(content);
    setValue("");
  }

  return (
    <div className="px-4 py-3 border-t border-black/20 bg-[#071014] flex items-center gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Message #general"
        className="flex-1 bg-[#0b1114] text-sm text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
      >
        Send
      </button>
    </div>
  );
}

function MemberList({ members }) {
  return (
    <aside className="w-64 bg-[#071011] border-l border-black/20 p-3 flex flex-col">
      <div className="text-sm font-semibold text-gray-200 mb-2">
        Members • {members.length}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 p-2 rounded hover:bg-[#081018]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-xs font-bold text-black">
              {m.name[0]}
            </div>
            <div className="text-sm text-gray-200">{m.name}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function App() {
  const [servers] = useState([
    { id: "s1", name: "SkyTalk", short: "S" },
    { id: "s2", name: "Guild", short: "G" },
    { id: "s3", name: "Raids", short: "R" },
  ]);

  const [activeServer, setActiveServer] = useState("s1");

  const [channels] = useState([
    { id: "c1", name: "general" },
    { id: "c2", name: "announcements" },
    { id: "c3", name: "memes" },
  ]);
  const [activeChannel, setActiveChannel] = useState("c1");

  const [messages, setMessages] = useState([
    { id: 1, author: "Astra", time: "10:01", content: "Welcome to SkyTalk!" },
    {
      id: 2,
      author: "Nova",
      time: "10:02",
      content: "Who's up for a raid tonight?",
    },
    { id: 3, author: "Astra", time: "10:04", content: "Count me in!" },
  ]);

  const [members] = useState([
    { id: "m1", name: "Astra" },
    { id: "m2", name: "Nova" },
    { id: "m3", name: "Riff" },
  ]);

  function handleSend(content) {
    const t = new Date();
    const time = t.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((m) => [
      ...m,
      { id: Date.now(), author: "You", time, content },
    ]);
  }

  return (
    <div className="h-screen w-screen text-white font-sans">
      <div className="max-w-[1400px] mx-auto h-full shadow-2xl rounded-lg overflow-hidden grid grid-cols-[64px_300px_1fr_256px] bg-[#0b0f12]">
        <ServerBar
          servers={servers}
          active={activeServer}
          onSelect={setActiveServer}
        />
        <ChannelList
          channels={channels}
          active={activeChannel}
          onSelect={setActiveChannel}
        />

        <div className="flex flex-col bg-[#071014]">
          <TopBar
            channelName={`#${
              channels.find((c) => c.id === activeChannel)?.name || "general"
            }`}
            subtitle="Welcome to the channel"
          />
          <ChatWindow messages={messages} />
          <MessageInput onSend={handleSend} />
        </div>

        <MemberList members={members} />
      </div>
    </div>
  );
}
