import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import classes from './Footer.module.scss';

export default function Footer() {
  const socialLinks = [
    { icon: 'twitter.svg', link: 'https://twitter.com/home', alt: 'twitter' },
    { icon: 'facebook.svg', link: 'https://www.facebook.com', alt: 'facebook' },
    { icon: 'instagram.svg', link: 'https://www.instagram.com', alt: 'instagram' },
    { icon: 'youtube.svg', link: 'https://www.youtube.com', alt: 'youtube' },
  ];

  const footerData = [
    {
      title: 'Quick Links',
      links: [
        { title: 'Home', link: '/' },
        { title: 'Cart', link: '/cart' },
        { title: 'Contact Us', link: '/contact-us' },
        { title: 'About Us', link: '/about-us' },
      ],
    },
    {
      title: 'Support',
      links: [
        { title: 'Disclaimer', link: '/privacy-policy' },
        { title: 'Terms of Use', link: '/terms-of-use' },
        { title: 'Privacy Policy', link: '/privacy-policy' },
      ],
    },
  ];

  return (
    <div className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            lg={3}
            md={12}
            sm={12}
            xs={12}
            className={classes.footerIconContainer}
          >
            <img src="/images/footer-icon.png" alt="site logo" />
            <Typography>
              © 2021 Stocks.
              {' '}
              <br />
              All rights reserved.
            </Typography>
          </Grid>
          {footerData.map((footerItem) => (
            <Grid item lg={3} md={4} sm={12} xs={12} key={footerItem.title}>
              <Typography className={classes.footerHeaderText}>
                {footerItem.title}
              </Typography>
              {footerItem.links.map(({ link, title }) => (
                <Link href={link} key={title}>
                  <Typography className={`${classes.footerLinkText} link-hover`} key={title}>
                    {title}
                  </Typography>
                </Link>
              ))}
            </Grid>
          ))}
          <Grid item lg={3} md={4} sm={12} xs={12}>
            <Typography className={classes.footerHeaderText}>
              Social Media
            </Typography>
            {socialLinks.map(({ link, icon, alt }) => (
              <Link href={link} key={icon}>
                <img className={classes.socialIcon} src={`images/footer-social-icons/${icon}`} alt={alt} />
              </Link>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
