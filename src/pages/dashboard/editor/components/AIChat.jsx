import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIChat = ({ formData, setFormData, selectedTech, handleTechSelect, handleTechRemove, availableLanguages }) => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Hi! I'm your AI assistant. Tell me what you want to change on your banner. For example: 'Change name to Alex' or 'Add React to stack'." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const processCommand = (text) => {
        const lowerText = text.toLowerCase();
        let response = "I'm not sure how to do that yet. Try asking to change name, role, or tech stack.";

        // Name
        if (lowerText.includes("change name to") || lowerText.includes("set name to")) {
            const name = text.replace(/change name to|set name to/i, "").trim();
            setFormData(prev => ({ ...prev, name }));
            response = `Updated name to "${name}".`;
        }
        // Role/Field
        else if (lowerText.includes("change role to") || lowerText.includes("set role to") || lowerText.includes("change field to")) {
            const field = text.replace(/change role to|set role to|change field to/i, "").trim();
            setFormData(prev => ({ ...prev, field }));
            response = `Updated role to "${field}".`;
        }
        // Twitter
        else if (lowerText.includes("twitter")) {
            const twitter = text.split(" ").pop(); // simplistic
            setFormData(prev => ({ ...prev, twitter }));
            response = `Updated Twitter handle.`;
        }
        // Github
        else if (lowerText.includes("github")) {
            const github = text.split(" ").pop();
            setFormData(prev => ({ ...prev, github }));
            response = `Updated GitHub handle.`;
        }
        // Add Tech
        else if (lowerText.includes("add")) {
            const techQuery = text.replace("add", "").trim().toLowerCase();
            // Find matching tech in availableLanguages
            const match = availableLanguages?.find(t => t.name.toLowerCase() === techQuery);

            if (match) {
                handleTechSelect(match.name);
                response = `Added "${match.name}" to your stack.`;
            } else {
                response = `Could not find tech "${techQuery}". Try checking the spelling.`;
            }
        }
        // Remove Tech
        else if (lowerText.includes("remove")) {
            const techQuery = text.replace("remove", "").trim().toLowerCase();
            const match = availableLanguages?.find(t => t.name.toLowerCase() === techQuery);

            if (match) {
                handleTechRemove(match.name);
                response = `Removed "${match.name}" from your stack.`;
            } else {
                // Try removing exactly what was typed if not found (fallback)
                handleTechRemove(techQuery);
                response = `Removed "${techQuery}" from your stack.`;
            }
        }
        // Layout
        else if (lowerText.includes("modern layout")) {
            setFormData(prev => ({ ...prev, layout: 'modern' }));
            response = "Switched to Modern layout.";
        }
        else if (lowerText.includes("standard layout")) {
            setFormData(prev => ({ ...prev, layout: 'standard' }));
            response = "Switched to Standard layout.";
        }

        return response;
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const responseText = processCommand(userMsg.text);
            const botMsg = { id: Date.now() + 1, type: 'bot', text: responseText };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[90vh] bg-white animate-in slide-in-from-left duration-300 relative">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50">
                <Sparkles size={18} className="text-purple-600" />
                <h3 className="font-bold text-gray-900">AI Assistant</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'bot' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                            {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'bot' ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me to change something..."
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form >
        </div >
    );
};

export default AIChat;
