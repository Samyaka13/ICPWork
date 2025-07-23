import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Briefcase, Target, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon: Icon, trend }) {
  const getIconInfo = () => {
    if (Icon === DollarSign) return { bg: "bg-green-100", text: "text-green-600" };
    if (Icon === Briefcase) return { bg: "bg-blue-100", text: "text-blue-600" };
    if (Icon === Target) return { bg: "bg-purple-100", text: "text-purple-600" };
    if (Icon === Star) return { bg: "bg-yellow-100", text: "text-yellow-600" };
    return { bg: "bg-gray-100", text: "text-gray-600" };
  };

  const { bg, text } = getIconInfo();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="min-h-[140px] border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
        <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`w-6 h-6 ${text}`} />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{trend}</span>
              </div>
            </div>
            
            <div className="text-right mt-4">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-sm font-medium text-gray-500">{title}</p>
            </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}