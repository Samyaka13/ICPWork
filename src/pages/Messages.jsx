
import React, { useState, useEffect } from "react";
import { Message, User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Send, Search, Phone, Video, 
  MoreVertical, Paperclip, Smile, Circle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

import ConversationList from "../components/messages/ConversationList";
import ChatArea from "../components/messages/ChatArea";
import MessageInput from "../components/messages/MessageInput";

export default function Messages() {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allParticipantsMap, setAllParticipantsMap] = useState(new Map());

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedConversation && user) {
      loadMessages(selectedConversation.id);
      markMessagesAsRead(selectedConversation.id);
    } else {
        setMessages([]);
    }
  }, [selectedConversation, user]);

  const markMessagesAsRead = async (conversationId) => {
    if (!user) return;

    try {
        const conversationMessages = await Message.filter(
            { conversation_id: conversationId },
            "created_date"
        );
        const unreadMessages = conversationMessages.filter(
            msg => msg.recipient_id === user.id && !msg.is_read
        );

        for (const msg of unreadMessages) {
            await Message.update(msg.id, { is_read: true });
        }
        loadData();
    } catch (error) {
        console.error("Error marking messages as read:", error);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      const userMessages = await Message.filter({
        $or: [
          { sender_id: currentUser.id },
          { recipient_id: currentUser.id }
        ]
      }, "-created_date");

      const uniqueParticipantIds = new Set();
      userMessages.forEach(message => {
        uniqueParticipantIds.add(message.sender_id);
        uniqueParticipantIds.add(message.recipient_id);
      });

      const fetchedUsers = await Promise.all(
          Array.from(uniqueParticipantIds).map(id => User.find(id))
      );
      const participantsMap = new Map(fetchedUsers.map(u => [u.id, u]));
      setAllParticipantsMap(participantsMap);

      const conversationMap = new Map();
      userMessages.forEach(message => {
        const conversationId = message.conversation_id;
        if (!conversationMap.has(conversationId)) {
          conversationMap.set(conversationId, {
            id: conversationId,
            lastMessage: message,
            participantIds: [message.sender_id, message.recipient_id],
            unreadCount: 0
          });
        }
        
        if (message.recipient_id === currentUser.id && !message.is_read) {
          conversationMap.get(conversationId).unreadCount++;
        }
      });

      const conversationsArray = Array.from(conversationMap.values()).map(conv => {
        const otherParticipantId = conv.participantIds.find(pId => pId !== currentUser.id);
        const otherParticipant = participantsMap.get(otherParticipantId) || null;
        
        return {
          ...conv,
          otherParticipant: otherParticipant,
          participants: conv.participantIds.map(id => participantsMap.get(id)).filter(Boolean)
        };
      });
      
      conversationsArray.sort((a, b) => 
        new Date(b.lastMessage.created_date) - new Date(a.lastMessage.created_date)
      );

      setConversations(conversationsArray);

      if (selectedConversation) {
        const reSelectedConv = conversationsArray.find(c => c.id === selectedConversation.id);
        setSelectedConversation(reSelectedConv || null);
      }

    } catch (error) {
      console.error("Error loading messages or conversations:", error);
    }
    setIsLoading(false);
  };

  const loadMessages = async (conversationId) => {
    try {
      const conversationMessages = await Message.filter(
        { conversation_id: conversationId }, 
        "created_date"
      );
      setMessages(conversationMessages);
    } catch (error) {
      console.error("Error loading conversation messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;
    
    try {
      const otherParticipantId = selectedConversation.participantIds.find(pId => pId !== user.id);
      
      if (!otherParticipantId) {
          console.error("No other participant found for this conversation.");
          return;
      }
      
      const messageData = {
        conversation_id: selectedConversation.id,
        sender_id: user.id,
        recipient_id: otherParticipantId,
        content: newMessage,
        message_type: "text",
        is_read: false
      };
      
      await Message.create(messageData);
      setNewMessage("");

      await loadMessages(selectedConversation.id);
      await loadData(); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const otherParticipantName = conv.otherParticipant?.name || "";
    return otherParticipantName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const chatHeaderParticipant = selectedConversation?.otherParticipant;
  const chatHeaderName = chatHeaderParticipant?.name || "Unknown User";
  const chatHeaderInitial = chatHeaderParticipant?.name ? chatHeaderParticipant.name.charAt(0).toUpperCase() : "U";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Messages
          </h1>
          <p className="text-gray-400">Communicate with clients and freelancers</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations Sidebar */}
          <Card className="border-slate-700 bg-slate-800 shadow-lg flex flex-col rounded-xl">
            <CardHeader className="pb-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="w-5 h-5" />
                  Conversations
                </CardTitle>
                <Badge className="bg-blue-900/50 text-blue-300 border border-blue-500/30 rounded-md">
                  {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                </Badge>
              </div>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 rounded-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                <ConversationList 
                  conversations={filteredConversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={setSelectedConversation}
                  currentUserId={user?.id}
                  allParticipantsMap={allParticipantsMap}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-center p-4">
                  {searchTerm ? (
                    <p>No conversations match your search.</p>
                  ) : (
                    <p>No conversations found.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="border-slate-700 bg-slate-800 shadow-lg h-full flex flex-col rounded-xl">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{chatHeaderInitial}</span> 
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{chatHeaderName}</h3> 
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                            <span>Online</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white rounded-full">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white rounded-full">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white rounded-full">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <ChatArea messages={messages} currentUserId={user?.id} />
                  </CardContent>
                  
                  <div className="border-t border-slate-700 p-4">
                    <MessageInput 
                      message={newMessage}
                      setMessage={setNewMessage}
                      onSend={sendMessage}
                    />
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-400">
                      Choose a conversation from the sidebar to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
