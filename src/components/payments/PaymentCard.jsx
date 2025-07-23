
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function PaymentCard({ transaction, index }) {
  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-900/50 text-green-300 border-green-500/30",
      pending: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
      failed: "bg-red-900/50 text-red-300 border-red-500/30"
    };
    return colors[status] || "bg-gray-700 text-gray-300 border-gray-600";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between p-4 border border-slate-700 rounded-xl hover:bg-slate-700/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${
          transaction.type === "received" 
            ? "bg-gradient-to-br from-green-500 to-green-600" 
            : "bg-gradient-to-br from-red-500 to-red-600"
        }`}>
          {transaction.type === "received" ? (
            <ArrowDownLeft className="w-5 h-5 text-white" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-white" />
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-white">{transaction.description}</h4>
          <p className="text-sm text-gray-400">
            {transaction.type === "received" ? "From" : "To"}: {
              transaction.from || transaction.to || "Platform"
            }
          </p>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-lg font-semibold ${
            transaction.type === "received" ? "text-green-400" : "text-red-400"
          }`}>
            {transaction.type === "received" ? "+" : "-"}
            {transaction.amount} {transaction.currency}
          </span>
          <Badge className={`${getStatusColor(transaction.status)} border flex items-center gap-1`}>
            {getStatusIcon(transaction.status)}
            {transaction.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">
          {format(new Date(transaction.date), "MMM d, yyyy HH:mm")}
        </p>
      </div>
    </motion.div>
  );
}
