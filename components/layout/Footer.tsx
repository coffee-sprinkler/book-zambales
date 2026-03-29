import { CATEGORY_NAV } from '@/constants/categories';
import { MUNICIPALITY_LABELS } from '@/constants/municipalities';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bz-footer'>
      <div className='container grid grid-cols-5 gap-4 py-8'>
        <div className='brand col-span-2'>
          <div className='footer-bz-brand'>
            Book<span>Zambales</span>
          </div>
          <p className='footer-bz-tagline w-3/4'>
            A tourism marketplace for Zambales, Philippines. Connecting local
            hosts with travelers who want the real experience.
          </p>
        </div>
        <div className='explore'>
          <h4>Explore</h4>
          <ul>
            <li>
              <Link href={'/listings'} className='footer-nav-link'>
                All Listings
              </Link>
            </li>
            {CATEGORY_NAV.map((category) => (
              <li key={category.value}>
                <Link href={category.href} className='footer-nav-link'>
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='locations col-span-2'>
          <h4>Locations</h4>
          <ul className='grid grid-cols-2'>
            {Object.entries(MUNICIPALITY_LABELS).map(([key, label]) => (
              <li key={key}>
                <Link
                  href={`/listings?location=${key}`}
                  className='footer-nav-link'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='border-t border-(--border) py-4'>
        <p className='copyright text-center text-[0.75rem]'>
          © {new Date().getFullYear()} BookZambales. Built for Zambales 🌊
        </p>
      </div>
    </footer>
  );
};

export default Footer;
