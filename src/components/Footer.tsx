import { Container, Typography, Grid, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useStyles } from "../utils/quizStyle";
import { useWindowSize } from "../context/useWindowSize";

export const Footer = () => {
  const classes = useStyles();

  const [, width] = useWindowSize();

  return (
    <>
      <footer>
        <Container maxWidth="sm" className={classes.footerContainer}>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: "bold" }}
          >
            SIGN UP FOR NEWSLETTER
          </Typography>
          <Typography align="center" className={classes.footerText}>
            fandomQuiz: brought up by arepo is a fun quiz gaming application to
            find out the inner fan inside you. Play quizzes from you favourite
            movies and television series and invite your friends.
          </Typography>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{
              maxWidth: width > 600 ? "60%" : "auto",
              margin: "0rem auto"
            }}
            
          >
            <Grid item>
              <a href="https://github.com/Saurabh071997">
                <IconButton>
                  <GitHubIcon className={classes.footerIcon} />
                </IconButton>
              </a>
            </Grid>

            <Grid item>
              <a href="https://www.linkedin.com/in/saurabh-kamboj/">
                <IconButton>
                  <LinkedInIcon className={classes.footerIcon} />
                </IconButton>
              </a>
            </Grid>

            <Grid item>
              <a href="mailto:saurabhkamboj1997@gmail.com">
                <IconButton>
                  <MailIcon className={classes.footerIcon} />
                </IconButton>
              </a>
            </Grid>

            <Grid item>
              <a href="https://twitter.com/im_saurabhK">
                <IconButton>
                  <TwitterIcon className={classes.footerIcon} />
                </IconButton>
              </a>
            </Grid>
          </Grid>

          <Typography align="center" className={classes.footerText}>
            The content of this site is copyright-protected and is the property
            of Arepo . Arepo's business concept is to offer health and quality
            at the best.
          </Typography>
          <Typography align="center" className={classes.footerAppName}>
            fandomQuiz
          </Typography>
          <Typography align="center">A product by </Typography>
          <Typography align="center" className={classes.footerCompanyName}>
            arepo
          </Typography>
        </Container>
      </footer>
    </>
  );
};
