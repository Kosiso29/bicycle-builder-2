import React from 'react'

export default function Logo({ color }: { color?: "white" | "black" }) {
    if (color === "white") {
        return (
            <svg
                viewBox="0 0 160 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", maxWidth: "160px", height: "auto" }}
            >
                <rect width="160" height="60" fill="#C4C4C480" />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="30"
                    fontWeight="bold"
                    fill="#191919"
                >
                    Cyke.Life
                </text>
            </svg>
        )
    }

    return (
        <svg
            viewBox="0 0 160 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", maxWidth: "160px", height: "auto" }}
        >
            <rect width="160" height="60" fill="#191919" />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="30"
                fontWeight="bold"
                fill="white"
            >
                Cyke.Life
            </text>
        </svg>
    )
}
