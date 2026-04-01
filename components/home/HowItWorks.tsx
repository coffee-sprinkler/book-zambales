const HowItWorks = () => {
  return (
    <section>
      <div className='container'>
        <div className='bz-eyebrows'>How it works</div>
        <h2>
          Book Zambales in <span className='highlight'>3 simple steps</span>
        </h2>
        <p>
          From <span>Mt. Pinatubo hikes</span> to{' '}
          <strong>Anawangin cove stays</strong> — discover, inquire, and go. No
          complicated signups. No hidden booking fees. Just you and Zambales.
        </p>
        <div className='steps' role='list'>
          <div className='step' role='listitem'>
            <div className='top'>
              <div className='num'>01</div>
              <div className='badge'>discover</div>
            </div>
            <div className='title-icon-wrap'>
              Browse by destination or category
            </div>
            <p>
              Search resorts, hiking tours, activities, and tour packages across
              all Zambales municipalities — Olongapo, San Antonio, Iba, and
              beyond. Filter by price, type, and location.
            </p>
            <div className='tags'></div>
          </div>
          <div className='step' role='listitem'>
            <div className='top'>
              <div className='num'>02</div>
              <div className='badge'>inquire</div>
            </div>
            <div className='title-icon-wrap'>
              Send a direct inquiry to the host
            </div>
            <p>
              Found something you like? Send a booking inquiry directly to the
              local host — no account required. Share your travel dates, group
              size, and questions. Hosts respond within 24 hours.
            </p>
            <div className='tags'></div>
          </div>
          <div className='step' role='listitem'>
            <div className='top'>
              <div className='num'>03</div>
              <div className='badge'>experience</div>
            </div>
            <div className='title-icon-wrap'>
              Confirm and experience real Zambales
            </div>
            <p>
              Once confirmed, pack your bags and head out. Whether it&apos;s
              surfing in Liwliwa, camping at Nagsasa Cove, or summiting Pinatubo
              — you&apos;re with verified local guides and hosts.
            </p>
            <div className='tags'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
