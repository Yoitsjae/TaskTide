import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero">
      <h2>Discover, book, and manage services near you.</h2>
      <Link to="/services"><button className="cta-btn">Explore Services</button></Link>
    </section>
  );
}

export default Home;
