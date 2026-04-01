import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';

export const metadata = {
  title: 'Home',
};

const Page = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
    </>
  );
};

export default Page;
