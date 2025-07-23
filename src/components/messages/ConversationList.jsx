
import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ConversationList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation,
  currentUserId 
}) {
  return (
    <div className="space-y-1">
      {conversations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No conversations yet</p>
        </div>
      ) : (
        conversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectConversation(conversation.id)}
            className={`p-4 cursor-pointer transition-colors border-l-2 ${
              selectedConversation === conversation.id ? 'bg-slate-700 border-blue-500' : 'border-transparent hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm truncate text-white">Project Discussion</h4>
                  <div className="flex items-center gap-2">
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-1.5">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-400">
                      {format(new Date(conversation.lastMessage.created_date), "MMM d")}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {conversation.lastMessage.content}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {conversation.lastMessage.sender_id === currentUserId ? 'You: ' : ''}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
