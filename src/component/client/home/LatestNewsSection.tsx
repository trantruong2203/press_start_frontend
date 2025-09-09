import { Button } from '@mui/material';

interface LatestNewsSectionProps {
    imageUrl?: string;
}

function LatestNewsSection({ imageUrl }: LatestNewsSectionProps) {
    return (
        <section className="mt-10">
            <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-wide">LATEST NEWS</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-[320px,1fr] gap-6 items-start">
                <div className="h-52 md:h-60 rounded-xl bg-zinc-700 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl || ''})` }} />
                <div className="text-white">
                    <h3 className="text-xl font-extrabold">LOREM IPSUM DOLOR SIT AMET,</h3>
                    <p className="text-zinc-300 mt-3 leading-relaxed">
                        Consectetur adipiscing elit. Quisque fermentum, erat at ornare convallis, purus orci
                        fermentum nunc, id dapibus ipsum arcu a enim. Donec non ante felis. Pellentesque accumsan,
                        lacus vitae ultrices imperdiet, metus leo. N elementum ac nibh. Vestibulum sit amet.
                    </p>
                    <Button variant="outlined" color="inherit" className="!mt-4 !rounded-full !border-white !text-white">READ MORE</Button>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <div className="h-6 w-6 rounded-full border border-white flex items-center justify-center text-white">∨</div>
            </div>
        </section>
    );
}

export default LatestNewsSection; 