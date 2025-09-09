import React from 'react';

interface GearItem {
    id: string;
    title: string;
    price: string;
}

interface GearsSectionProps {
    items: GearItem[];
    backgroundUrl?: string;
}

function GearsSection({ items, backgroundUrl }: GearsSectionProps) {
    return (
        <section className="mt-10 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundUrl || ''})` }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 p-6">
                <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-wide">GAMING GEARS</h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((it) => (
                        <div key={it.id} className="bg-red-600 text-white rounded-xl p-4 shadow-xl">
                            <div className="font-bold uppercase text-sm">{it.title}</div>
                            <div className="text-white/80 mt-2 line-through">{it.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GearsSection; 