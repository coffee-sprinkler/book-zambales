import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchComponent } from '@/components/home/Search';
import Hero_Illustration from '@/public/zambales.png';

const Hero = () => {
  return (
    <section className='hero relative min-h-[88vh] flex flex-col justify-center border-b border-(--bg)'>
      <div className='hero-bg'></div>
      <div className='hero-grid-overlay'></div>
      <div className='container flex gap-2 items-center relative z-2'>
        <div className='flex-1'>
          <div className='hero-caption'>Zambales, Philippines</div>
          <h1>
            Sun, <em>Surf</em> & Stays in Zambales
          </h1>
          <p className='text-muted'>
            Browse and book the best resorts, cottages, and hotels along the
            Zambales coast.
          </p>
          <div className='hero-cta mt-8 flex gap-4'>
            <Link href={'/listings'} className='btn-primary'>
              <Search size={16} /> Browse Listings
            </Link>
            <Link href={'/host'} className='btn-outline'>
              <Home size={16} /> List Your Place
            </Link>
          </div>
        </div>
        <div className='flex-1'>
          <Image
            src={Hero_Illustration}
            className='rounded-2xl'
            alt='book zambales hero illustration'
          />
        </div>
      </div>
      <div className='container z-2'>
        <SearchComponent />
      </div>
    </section>
  );
};

export default Hero;
