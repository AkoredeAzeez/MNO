import Link from 'next/link';
import { ArrowRight, Globe, Heart } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>About the foundation</p>
          <h2 id="about-title" className={styles.title}>Opening doors for women and youth</h2>
          <p className={styles.description}>
            The Margaret Nkem Orakwusi Foundation honours a legacy of leadership and
            service by connecting women and young people to opportunities in the maritime industry.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}><Heart size={22} aria-hidden="true" /></span>
              <h3>Our Mission</h3>
            </div>
            <p>To empower women and youth through education, mentorship, awareness, and access to opportunities in the maritime industry and related sectors.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}><Globe size={22} aria-hidden="true" /></span>
              <h3>Our Vision</h3>
            </div>
            <p>To build a vibrant and inclusive maritime future where women and youth are empowered, informed, and equipped to lead and succeed.</p>
          </article>
        </div>
        <div className={styles.more}>
          <Link href="/about" className={styles.link}>
            More about the foundation <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <p>Our story, values, and approach to lasting impact.</p>
        </div>
      </div>
    </section>
  );
}
