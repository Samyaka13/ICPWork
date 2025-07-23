import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChartCard({ title, subtitle, children }) {
  return (
    <Card className="border-slate-700 bg-slate-800 rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}