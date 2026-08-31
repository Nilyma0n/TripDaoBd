import { useState } from "react";
import {
  Search,
  Send,
  Headphones,
  MapPin,
  Clock3,
  CheckCheck,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "support";
  text: string;
  time: string;
}

const Messages = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "support",
      text: "Hello! Welcome to TripDaoBD. How can we help you today?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Hi! I need some help with my upcoming trip.",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "support",
      text: "Of course! Please tell us what you need help with.",
      time: "10:33 AM",
    },
  ]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setMessage("");

    setTimeout(() => {
      const supportReply: Message = {
        id: Date.now() + 1,
        sender: "support",
        text: "Thanks for your message! Our support team will get back to you shortly.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        supportReply,
      ]);
    }, 800);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <section>
        <p className="text-[#d6ae52] text-sm mb-2">
          Support Center
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Messages
        </h1>

        <p className="text-slate-400 mt-2">
          Chat with the TripDaoBD support team.
        </p>
      </section>

      {/* MAIN CONTENT */}

      <section className="grid lg:grid-cols-3 gap-6">

        {/* CHAT */}

        <div className="lg:col-span-2 bg-[#0d2523] border border-white/5 rounded-3xl overflow-hidden flex flex-col min-h-[650px]">

          {/* CHAT HEADER */}

          <div className="p-6 border-b border-white/5 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="w-12 h-12 rounded-full bg-[#c9a34e]/10 border border-[#c9a34e]/20 flex items-center justify-center">

                  <Headphones
                    size={22}
                    className="text-[#d9b45c]"
                  />

                </div>

                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0d2523]" />

              </div>

              <div>

                <h2 className="font-semibold text-white">
                  TripDaoBD Support
                </h2>

                <p className="text-xs text-emerald-400 mt-1">
                  Online
                </p>

              </div>

            </div>

            <button
              type="button"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              title="Search messages"
            >
              <Search
                size={18}
                className="text-slate-400"
              />
            </button>

          </div>

          {/* MESSAGES */}

          <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[480px]">

            {messages.map((item) => {

              const isUser = item.sender === "user";

              return (
                <div
                  key={item.id}
                  className={`flex ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] flex flex-col ${
                      isUser
                        ? "items-end"
                        : "items-start"
                    }`}
                  >

                    <div
                      className={`px-5 py-3 rounded-2xl ${
                        isUser
                          ? "bg-[#c9a34e] text-[#071817] rounded-br-md"
                          : "bg-white/5 text-slate-200 border border-white/5 rounded-bl-md"
                      }`}
                    >

                      <p className="text-sm leading-relaxed">
                        {item.text}
                      </p>

                    </div>

                    <div className="flex items-center gap-2 mt-2">

                      <span className="text-[11px] text-slate-500">
                        {item.time}
                      </span>

                      {isUser && (
                        <CheckCheck
                          size={13}
                          className="text-[#d9b45c]"
                        />
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* MESSAGE INPUT */}

          <div className="p-5 border-t border-white/5">

            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl p-2">

              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm text-white placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-11 h-11 rounded-xl bg-[#d6ae52] hover:bg-[#e3be67] disabled:opacity-40 disabled:cursor-not-allowed text-[#071817] flex items-center justify-center transition"
                title="Send message"
              >

                <Send size={18} />

              </button>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-5">

          {/* SUPPORT CARD */}

          <div className="bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-3xl p-7">

            <div className="w-14 h-14 rounded-2xl bg-[#c9a34e]/10 flex items-center justify-center mb-5">

              <MessageCircle
                size={25}
                className="text-[#d9b45c]"
              />

            </div>

            <h3 className="text-lg font-semibold">
              Need assistance?
            </h3>

            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Our support team can help you with bookings,
              destinations, hotels, transportation, and other
              travel-related questions.
            </p>

          </div>

          {/* SUPPORT INFORMATION */}

          <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6">

            <h3 className="font-semibold mb-5">
              Support Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                  <Clock3
                    size={18}
                    className="text-emerald-400"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-300">
                    Support Hours
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    9:00 AM - 10:00 PM
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

                  <MapPin
                    size={18}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-300">
                    Service Area
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    All across Bangladesh
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RESPONSE TIME */}

          <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6">

            <div className="flex items-center gap-3">

              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />

              <p className="text-sm text-slate-300">
                Usually replies within a few minutes
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Messages;