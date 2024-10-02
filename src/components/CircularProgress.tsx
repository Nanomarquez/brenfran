"use client";

import React from "react";
import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number; // Value between 0 and 100
  size?: number;
  strokeWidth: number;
  color?: string;
  label: number;
  interval: string;
}

export default function CircularProgress({
  value,
  size = 100,
  strokeWidth,
  color = "#3b82f6",
  label,
  interval,
}: CircularProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const progress = 100 - normalizedValue;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold flex-col">
        <p>{label}</p>
        <p>{interval}</p>
      </div>
    </div>
  );
}
