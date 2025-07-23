import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MessageSquare, User, Upload, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function QuickActions({ userType }) {
  const freelancerActions = [
    {
      title: "Find Projects",
      description: "Browse latest opportunities",
      icon: Search,
      href: createPageUrl("Projects"),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Update Profile",
      description: "Enhance your visibility",
      icon: User,
      href: createPageUrl("Profile"),
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Check Messages",
      description: "3 unread messages",
      icon: MessageSquare,
      href: createPageUrl("Messages"),
      color: "from-green-500 to-green-600"
    }
  ];

  const clientActions = [
    {
      title: "Post Project",
      description: "Find perfect talent",
      icon: Plus,
      href: createPageUrl("PostProject"),
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Browse Talent",
      description: "Find skilled freelancers",
      icon: Search,
      href: createPageUrl("Freelancers"),
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "View Proposals",
      description: "Review submissions",
      icon: Eye,
      href: createPageUrl("Proposals"),
      color: "from-blue-500 to-blue-600"
    }
  ];

  const actions = userType === "client" ? clientActions : freelancerActions;

  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 justify-start hover:scale-105 transition-all duration-300"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}