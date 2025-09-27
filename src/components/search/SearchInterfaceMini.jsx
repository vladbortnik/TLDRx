import React, { useState, useEffect } from 'react';

export function SearchInterfaceMini({ searchQuery, onClick }) {
    const [cursor, setCursor] = useState(true);

    // Cursor blinking animation
    useEffect(() => {
        const interval = setInterval(() => setCursor(c => !c), 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            className="backdrop-blur-xl bg-[#1a0b3d]/95 border-b-2 border-[#4a3b8c] px-5 py-3 cursor-pointer transition-all duration-300 hover:bg-[#1a0b3d]/90"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                {/* Search label with current query */}
                <div className="flex items-center gap-2">
                    <span className="text-yellow-300 font-mono text-base font-semibold">
                        search
                    </span>
                    <span className="text-white/70 font-mono">→</span>
                    <span className="text-white font-mono">
                        {searchQuery || 'query'}
                    </span>
                </div>
                
                {/* Blinking cursor on the right */}
                <span className={`w-2 h-5 bg-yellow-300 transition-opacity duration-100 ${
                    cursor ? 'opacity-100' : 'opacity-0'
                }`}></span>
            </div>
        </div>
    );
}