
interface TrailerItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
}

interface TrailersSectionProps {
    items: TrailerItem[];
}

function TrailersSection({ items }: TrailersSectionProps) {
    return (
        <section className="mt-10">
            <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-wide">WATCH TRAILERS</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((it) => (
                    <div key={it.id} className="rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
                        <div className="h-44 md:h-56 bg-zinc-700 bg-cover bg-center" style={{ backgroundImage: `url(${it.imageUrl || ''})` }} />
                        <div className="p-4 text-white">
                            <div className="font-semibold">{it.title}</div>
                            <div className="text-zinc-300 text-sm mt-2 line-clamp-3">{it.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TrailersSection; 