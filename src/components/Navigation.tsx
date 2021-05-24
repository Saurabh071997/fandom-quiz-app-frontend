import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
// import { Link } from "react-router-dom";
import { useStyles } from "../utils/quizStyle";

export const QuizIcon = () => {
  const classes = useStyles();
  let img_icon =
    "https://www.pngkit.com/png/full/20-205143_fandom-heart-icon-fandom-logo.png";
  return (
    <>
      <img src={img_icon} alt="icon" className={classes.navIcon} />
    </>
  );
};

export const Navigation = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navBg}>
          <IconButton size="small" edge="end">
            {/* <Link to="/"> */}
              <QuizIcon />
            {/* </Link> */}
          </IconButton>
          <Typography variant="h5" className={classes.navTitle}>
            {" "}
            fandomQUIZ{" "}
          </Typography>
          <IconButton>
            {/* <Link to="/leaderboard"> */}
              <EqualizerIcon className={classes.navChart} />
            {/* </Link> */}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};
