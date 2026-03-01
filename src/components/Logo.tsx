import React from "react";
import Image from "next/image";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

export default function Logo({ className = "", size = "md", showText = false }: LogoProps) {
    const sizes = {
        sm: { width: 100, height: 100 },
        md: { width: 140, height: 140 },
        lg: { width: 200, height: 200 },
    };

    const { width, height } = sizes[size];

    return (
        <div className={`flex items-center ${className}`}>
            <Image
                src="/logo.png"
                alt="Mama DD's African Kitchen"
                width={width}
                height={height}
                priority
                className="object-contain"
            />
        </div>
    );
}
