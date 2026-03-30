import { CATEGORY_NAV } from '@/constants/categories';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';

const Header = () => {
  return (
    <header className='bz-header flex items-center'>
      <div className='container flex justify-between items-center'>
        <Link
          href={'/'}
          aria-label='Book Zambales - Home'
          className='bz-brand-logo flex items-center'
        >
          <Image
            src={Logo}
            alt='book zambales logo'
            width={32}
            height={32}
            className='me-1'
          />
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
