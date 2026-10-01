import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProgramDetailsList from '../../components/ProgramDetailsList';
import Footer from '../../components/Footer';
import styles from '../about/page.module.css';

export const metadata = {
  title: 'Our Programs | Margaret Nkem Orakwusi Foundation',
  description: 'Explore our seven focus areas and programs supporting women and youth through maritime education, mentorship, inclusion, and opportunity.',
};

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Programs</span>
        </nav>
        <ProgramDetailsList />
      </main>
      <Footer />
    </>
  );
}
