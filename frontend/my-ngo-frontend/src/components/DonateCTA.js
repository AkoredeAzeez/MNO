import Link from 'next/link';
import { Heart, Gift, ArrowRight } from 'lucide-react';
import styles from './About.module.css';
import actions from './SectionActions.module.css';

export default function DonateCTA() {
  return (
    <section id="donate" className={styles.section} aria-labelledby="support-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Make a difference</p>
          <h2 id="support-title" className={styles.title}>Support Our Mission</h2>
          <p className={styles.description}>Help women and youth access education, mentorship, and opportunities in the maritime industry.</p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}><Heart size={22} aria-hidden="true" /></span>
              <h3>Give in a way that works for you</h3>
            </div>
            <p>Make a one-time contribution or explore ongoing support for the foundation and its programs.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}><Gift size={22} aria-hidden="true" /></span>
              <h3>Help learning go further</h3>
            </div>
            <p>Your support helps fund training, mentorship, and outreach. Learning materials and other in-kind donations are welcome too.</p>
          </article>
        </div>
        <div className={styles.more}>
          <div className={actions.group}>
            <Link href="/donate" className={styles.link}>Donate Now <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/support" className={actions.secondary}>Explore ways to support</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
