import React from 'react';

export interface SimpleGameItem {
    id: string;
    title: string;
    label?: string;
    imageUrl?: string;
}

interface ColumnProps {
    title: string;
    items: SimpleGameItem[];
}

function Column({ title, items }: ColumnProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold uppercase tracking-wide">{title}</h3>
                <a href="#" className="text-xs text-zinc-300 hover:text-white">View More</a>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                {items.map((it) => (
                    <div key={it.id} className="flex gap-3">
                        <div className="h-16 w-12 bg-zinc-700 rounded bg-cover bg-center" style={{ backgroundImage: `url(${it.imageUrl || ''})` }} />
                        <div className="text-sm">
                            <div className="text-white line-clamp-2">{it.title}</div>
                            {it.label && <div className="text-zinc-400 text-xs">{it.label}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface ThreeColumnsSectionProps {
    newRelease: SimpleGameItem[];
    freeGames: SimpleGameItem[];
    comingSoon: SimpleGameItem[];
}

function ThreeColumnsSection({ newRelease, freeGames, comingSoon }: ThreeColumnsSectionProps) {
    return (
        <section className="mt-10 bg-zinc-900/80 rounded-xl p-6 border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Column title="New Release" items={newRelease} />
                <Column title="Free Games" items={freeGames} />
                <Column title="Coming Soon" items={comingSoon} />
            </div>
        </section>
    );
}

export default ThreeColumnsSection; 