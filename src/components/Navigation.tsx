import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useStyles } from "../utils/quizStyle";
import { useAuth } from "../context/AuthProvider";

// export const QuizIcon = () => {
//   const classes = useStyles();
//   let img_icon =
//     "https://www.pngkit.com/png/full/20-205143_fandom-heart-icon-fandom-logo.png";
//   return (
//     <>
//       <img src={img_icon} alt="icon" className={classes.navIcon} />
//     </>
//   );
// };

export const SignIn = () => {
  return (
    <div>
      <NavLink to="/login">
        <button className="btn-sign-in"> sign in</button>
      </NavLink>
    </div>
  );
};

export const DisplayProfile = () => {
  const classes = useStyles()
  return <IconButton>
    <Link to='/userprofile'>
      <PersonOutlineOutlinedIcon className={classes.navProfile}/>
    </Link>
  </IconButton>
};

export const Navigation = () => {
  const {
    // eslint-disable-next-line
    authState: { accessToken },
  } = useAuth();

  const navigate = useNavigate()

  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navBg}>
          {/* <IconButton size="small" edge="end">
            <Link to="/">
              <QuizIcon />
            </Link>
          </IconButton> */}
          
          <Typography variant="h5" className={classes.navTitle} onClick={()=>{navigate('/')}}>
            
            fandomQUIZ
          </Typography>
        
          <IconButton>
            <Link to="/leaderboard">
              <EqualizerIcon className={classes.navChart} />
            </Link>
          </IconButton>
          {
            accessToken ? <DisplayProfile/> : <SignIn/>
          }

          {/* <DisplayProfile /> */}
        </Toolbar>
      </AppBar>
    </>
  );
};
