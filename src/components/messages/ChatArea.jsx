
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ChatArea({ messages, currentUserId }) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isOwn = message.sender_id === currentUserId;
        
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              isOwn 
                ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' 
                : 'bg-slate-700 text-white'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 text-right ${
                isOwn ? 'text-blue-100/70' : 'text-gray-400'
              }`}>
                {format(new Date(message.created_date), "HH:mm")}
              </p>
            </div>
          </motion.div>
        );
      })}
      
      {messages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      )}
    </div>
  );
}
