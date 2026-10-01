import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AboutDetails from '../../components/AboutDetails';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us | Margaret Nkem Orakwusi Foundation',
  description: 'Explore our mission, values, legacy, and approach to empowering women and youth in the maritime industry.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About us</span>
        </nav>
        <AboutDetails />
      </main>
      <Footer />
    </>
  );
}
