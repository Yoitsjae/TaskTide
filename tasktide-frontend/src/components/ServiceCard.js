function ServiceCard({ title, description, imgSrc }) {
  return (
    <div className="service-card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="learn-more-btn">Learn More</button>
    </div>
  );
}

export default ServiceCard;
