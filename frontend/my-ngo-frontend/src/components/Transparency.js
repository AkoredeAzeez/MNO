import Link from 'next/link';
import { FileText, Shield, ArrowRight } from 'lucide-react';
import styles from './About.module.css';

export default function Transparency() {
  return (
    <section id="transparency" className={styles.section} aria-labelledby="transparency-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Accountability at every step</p>
          <h2 id="transparency-title" className={styles.title}>Transparency & Governance</h2>
          <p className={styles.description}>We are committed to responsible stewardship, clear oversight, and open communication with our community.</p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}><FileText size={22} aria-hidden="true" /></span>
              <h3>Financial accountability</h3>
            </div>
            <p>Explore our reporting commitments and available documents to understand how contributions support our work.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}><Shield size={22} aria-hidden="true" /></span>
              <h3>Responsible leadership</h3>
            </div>
            <p>Learn about our governance approach, partnerships, and commitment to community feedback and ethical standards.</p>
          </article>
        </div>
        <div className={styles.more}>
          <Link href="/transparency" className={styles.link}>Explore reports & governance <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
