import { getNextStaticProps } from '@faustjs/next';
import React from 'react';
import { client } from 'client';
import { FaArrowRight } from 'react-icons/fa';
import {
  Posts,
  Header,
  Footer,
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  SEO,
} from 'components';
import styles from 'styles/pages/_Home.module.scss';
import { pageTitle } from 'utils';

const postsPerPage = 3;

export default function Page() {
  const { useQuery, usePosts } = client;
  const query = useQuery();

  // Get ACF social media repeater field from global settings option page
  const generalSettings = query.generalSettings;
  const globalSettings = query.globalSettings;

  // Retreive social links ACF from the global settings 
  console.log(globalSettings.social.socialLinks[0].url);

  const posts = usePosts({
    first: postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });
  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Blog Banner',
  };
  return (
    <>
      <SEO
        title={pageTitle(generalSettings)}
        imageUrl={mainBanner?.sourceUrl}
      />

      <Header />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <div className="container">
          <section className="hero text-center">
            <Heading className={styles.heading} level="h1">
              Welcome to your Blueprint
            </Heading>
            <p className={styles.description}>
              Achieve unprecedented performance with modern frameworks and the
              world&apos;s #1 open source CMS in one powerful headless platform.{' '}
            </p>
            <div className={styles.actions}>
              <Button styleType="secondary" href="/contact-us">
                GET STARTED
              </Button>
              <Button styleType="primary" href="/about">
                LEARN MORE
              </Button>
            </div>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
          <section className={styles.posts}>
            <Heading className={styles.heading} level="h2">
              Latest Posts
            </Heading>
            <Posts posts={posts?.nodes} id="posts-list" />
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
        </div>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
