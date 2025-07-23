import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile } from "lucide-react";

export default function MessageInput({ message, setMessage, onSend }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-3">
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 rounded-full">
          <Paperclip className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 rounded-full">
          <Smile className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-slate-700 border-slate-600 rounded-lg"
        />
        <Button 
          onClick={onSend}
          disabled={!message.trim()}
          className="bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}