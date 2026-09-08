import Link from 'next/link';
import Navbar from '../../components/Navbar';
import SupportDetails from '../../components/SupportDetails';
import Footer from '../../components/Footer';
import styles from '../about/page.module.css';

export const metadata = {
  title: 'Support Our Mission | Margaret Nkem Orakwusi Foundation',
  description: 'Explore donation options, in-kind giving, and how your support helps women and youth access maritime opportunities.',
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Support our mission</span>
        </nav>
        <SupportDetails />
      </main>
      <Footer />
    </>
  );
}
