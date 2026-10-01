import Link from 'next/link';
import Navbar from '../../components/Navbar';
import TransparencyDetails from '../../components/TransparencyDetails';
import Footer from '../../components/Footer';
import styles from '../about/page.module.css';

export const metadata = {
  title: 'Transparency & Governance | Margaret Nkem Orakwusi Foundation',
  description: 'Explore our reports, governance approach, partnerships, and commitments to accountability and community engagement.',
};

export default function TransparencyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Transparency & governance</span>
        </nav>
        <TransparencyDetails />
      </main>
      <Footer />
    </>
  );
}
