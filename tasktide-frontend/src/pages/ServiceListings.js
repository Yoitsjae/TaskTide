import ServiceCard from '../components/ServiceCard';

function ServiceListings() {
  const services = [
    { title: 'Home Cleaning', description: 'Professional home cleaning service', imgSrc: '' },
    { title: 'Plumbing', description: 'Expert plumbing services', imgSrc: '' },
    // More services here...
  ];

  return (
    <div className="service-listings">
      {services.map((service, index) => (
        <ServiceCard key={index} title={service.title} description={service.description} imgSrc={service.imgSrc} />
      ))}
    </div>
  );
}

export default ServiceListings;
