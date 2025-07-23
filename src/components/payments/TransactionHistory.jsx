import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";

import PaymentCard from "./PaymentCard";

export default function TransactionHistory({ transactions }) {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search transactions..."
            className="pl-10 bg-slate-700 border-slate-600 rounded-lg"
          />
        </div>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-slate-700 border-slate-600 rounded-lg">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600 text-white rounded-xl">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-slate-700 border-slate-600 rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600 text-white rounded-xl">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 rounded-lg">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <PaymentCard key={transaction.id} transaction={transaction} index={index} />
        ))}
      </div>
    </div>
  );
}