import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function WalletBalance({ title, amount, subtitle, icon: Icon, gradient }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border border-slate-700 bg-slate-800 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white mb-2">{amount}</p>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}