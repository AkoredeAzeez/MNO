import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './About.module.css';
import programStyles from './Programs.module.css';

export default function Programs() {
  return (
    <section id="programs" className={styles.section} aria-labelledby="programs-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Our programmatic focus areas</p>
          <h2 id="programs-title" className={styles.title}>Skills for today. Opportunities for tomorrow.</h2>
          <p className={styles.description}>We help women and youth learn, grow, and find their place in the maritime industry.</p>
        </div>
        <div className={styles.grid}>
          <article className={programStyles.card}>
            <Image src="/img/programs/learning-mentorship.png" alt="Animated characters: a maritime educator guiding two young adults with a model ship and learning materials." width={1536} height={1024} sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1080px) calc((100vw - 60px) / 2), 510px" className={programStyles.image} />
            <div className={programStyles.content}>
              <h3>Learning & Mentorship</h3>
              <p>Education, professional guidance, and practical skills to build confidence and prepare for maritime careers.</p>
            </div>
          </article>
          <article className={programStyles.card}>
            <Image src="/img/programs/maritime-opportunities.png" alt="Animated characters: a woman maritime professional introducing two young adults to a working harbour." width={1536} height={1024} sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1080px) calc((100vw - 60px) / 2), 510px" className={programStyles.image} />
            <div className={programStyles.content}>
              <h3>Access & Opportunity</h3>
              <p>Maritime awareness, empowerment, and inclusive connections to networks, internships, and professional opportunities.</p>
            </div>
          </article>
        </div>
        <div className={styles.more}>
          <Link href="/programs" className={styles.link}>Explore all focus areas <ArrowRight size={18} aria-hidden="true" /></Link>
          <p>Discover our seven focus areas and the programs behind them.</p>
        </div>
      </div>
    </section>
  );
}
