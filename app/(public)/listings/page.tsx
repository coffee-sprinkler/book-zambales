import { createClient } from '@/lib/supabase/server';

const ListingPage = async () => {
  const supabase = await createClient();

  const { data: listings } = await supabase.from('listings').select('*');

  return (
    <ul>
      {listings?.map((listing) => (
        <li key={listing.id}>{JSON.stringify(listing)}</li>
      ))}
    </ul>
  );
};

export default ListingPage;
