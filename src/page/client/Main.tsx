
import BannerSlider from '../../component/client/home/BannerSlider';
import BestsellerSection from '../../component/client/home/BestsellerSection';
import TrailersSection from '../../component/client/home/TrailersSection';
import ThreeColumnsSection from '../../component/client/home/ThreeColumnsSection';
import GearsSection from '../../component/client/home/GearsSection';
import LatestNewsSection from '../../component/client/home/LatestNewsSection';


function Main() {
    const trailers = [
        { id: 't1', title: 'Ghost of Tsushima', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum.' },
        { id: 't2', title: 'Guardians of the Galaxy', description: 'Pellentesque accumsan lacus vitae ultrices imperdiet. Quisque venenatis.' },
    ];

    const newRelease = [
        { id: 'n1', title: 'LEGO Star Wars', label: '$39.00' },
        { id: 'n2', title: 'Ghostwire Tokyo', label: '$30.00' },
        { id: 'n3', title: 'SIFU', label: '$29.00' },
        { id: 'n4', title: 'Horizon Forbidden West', label: '$60.00' },
    ];
    const freeGames = [
        { id: 'f1', title: 'Dota 2', label: 'Free' },
        { id: 'f2', title: 'Fortnite', label: 'Free' },
        { id: 'f3', title: 'Apex Legends', label: 'Free' },
        { id: 'f4', title: 'Valorant', label: 'Free' },
    ];
    const comingSoon = [
        { id: 'c1', title: 'Evil Dead The Game', label: 'Coming Soon' },
        { id: 'c2', title: 'Gotham Knights', label: 'Coming Soon' },
        { id: 'c3', title: 'Hogwarts Legacy', label: 'Coming Soon' },
        { id: 'c4', title: 'God of War RAGNAROK', label: 'Coming Soon' },
    ];

    const gears = [
        { id: 'ge1', title: 'RGB Keyboard', price: '$65.00' },
        { id: 'ge2', title: 'Logitech Gaming Headphone', price: '$30.00' },
        { id: 'ge3', title: 'Predator Monitor', price: '$125.75' },
        { id: 'ge4', title: 'Predator Casing', price: '$255.00' },
    ];
   

  



    return (
        <div className=" min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <BannerSlider />
                <BestsellerSection />
                <TrailersSection items={trailers} />
                <ThreeColumnsSection newRelease={newRelease} freeGames={freeGames} comingSoon={comingSoon} />
                <GearsSection items={gears} />
                <LatestNewsSection />
            </div>
        </div>
    );
}

export default Main;