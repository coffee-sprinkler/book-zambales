import { CATEGORY_NAV } from '@/constants/categories';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='bz-header flex items-center'>
      <div className='container flex justify-between items-center'>
        <Link href={'/'} aria-label='Book Zambales - Home' className='bz-logo'>
          Book<span className='text-(--color-primary)'>Zambales</span>
        </Link>
        <nav aria-label='Main navigation'>
          <ul className='flex gap-4'>
            {CATEGORY_NAV.map((category) => (
              <li key={category.value}>
                <Link href={category.href} className='text-nav'>
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={'/login'}
          aria-label='Create an account'
          className='btn-primary'
        >
          Join Now
        </Link>
      </div>
    </header>
  );
};

export default Header;
