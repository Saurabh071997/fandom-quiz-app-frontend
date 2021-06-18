import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  navBg: {
    backgroundColor: "#0C4A6E",
    padding: "0.5rem"
  },

  navIcon: {
    height: "1rem",
    width: "1rem",
    margin: "0rem 0.5rem 0rem 0rem",
    cursor: "pointer"
  },

  navChart: {
    color: "white",
    height: "2rem",
    width: "2rem"
  },

  navProfile:{
    color: "white",
    height: "2rem",
    width: "2rem"
  },

  navTitle: {
    // textAlign:"center",
    marginLeft:"1rem",
    flexGrow: 1,
    cursor:"pointer"

  },

  footerContainer: {
    padding: "1rem"
  },

  footerGrid: {
    width: "50%",
    margin: "0rem auto"
  },

  footerText: {
    fontSize: "1.1rem",
    color: "black",
    margin: "0.5rem 0rem"
  },

  footerIcon: {
    color: "black"
  },

  footerAppName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1E3A8A"
  },

  footerCompanyName: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    color: "#1E3A8A"
  },

  cardGrid: {
    paddingTop: "1rem"
  },

  card: {
    height: "100%",
    display: "block"
  },

  cardMedia: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    borderRadius: "0.5rem"
  },

  quizContainer: {
    position: "relative",
    padding: "0rem",
    // backgroundColor: "#0C4A6E",
    height: "100vh",
    textAlign:"center"
  },

  quizBgImg: {
    width: "100%",
    height: "90vh",
    opacity: "0.7"
  },

  quizSubContainer: {
    // position: "absolute",
    // top: "3rem"
    backgroundColor:"#E5E5E5",
    padding:"1rem",
    margin:"1.25rem auto",
  },

  pageHead: {
    fontSize: "3rem",
    fontWeight: "bold",
    margin: "2rem auto",
    // color:"#0284C7",
    color:"#0369A1"
  },

  quizQuestion: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem"
  },

  quizOption: {
    fontSize: "1.5rem",
    margin: "0.5rem 0rem",
    padding: "1rem 0.5rem",
    border: "1px solid #9CA3AF",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "100%",
    background: "transparent",
    "&:hover": {
      boxShadow: "2px 0px 4px #9CA3AF"
    }
  },

  quizOptionSelected: {
    fontSize: "1.5rem",
    margin: "0.5rem 0rem",
    padding: "1rem 0.5rem",
    border: "1px solid #0369A1",
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: "#0369A1",
    width: "100%",
    "&:hover": {
      boxShadow: "2px 0px 4px #9CA3AF"
    }
  },

  btnNavigate: {
    outline: "none",
    fontSize: "1.25rem",
    background: "transparent",
    border: "2px solid #0C4A6E",
    color: "#0C4A6E",
    padding: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: "#0C4A6E"
    }
  },

  btnModal: {
    outline: "none",
    border: "none",
    fontSize: "1.15rem",
    padding: "0.35rem 0.5rem",
    color: "white",
    backgroundColor: "#171717",
    cursor: "pointer"
  },

  modalIcon: {
    position: "relative",
    top: "0.2em"
  },

  btnFinish: {
    outline: "none",
    fontSize: "1.25rem",
    background: "transparent",
    border: "2px solid #EF4444",
    color: "#EF4444",
    padding: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: "#EF4444"
    }
  },

  score: {
    fontSize: "1.75rem",
    color: "#075985"
  },

  scoreTotal: {
    fontSize: "1.25rem",
    color: "#0284C7"
  },

  graph: {
    borderLeft: "1px solid #71717A",
    borderBottom: "1px solid #71717A",
    marginBottom: "2rem",
    backgroundColor:"yellow"
  },

  resultOption: {
    fontSize: "1.15rem",
    margin: "0.25rem 0rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "100%",
    background: "transparent"
  },

  credentialsContainer: {
    display:"flex",
    flexDirection:"column"
  },

  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "2rem auto",
    textAlign: "center",
    color:"#0284C7",
  },

  inputFields: {
    margin:"0.5rem auto"
  },

  userAvatar: {
    fontSize:"1.75rem",
    margin: "0.5rem auto",
    color:"#0C4A6E"
  },

  linkEdit: {
    fontSize: "1rem",
    color: "#0284C7",
    margin: "0.5rem auto",
    "&:hover" :{
      cursor:"pointer",
      textDecoration:"underline"
    }
  },

  profileGridItem : {
    margin:"0.35rem auto",
    width:"80%",
    display:"flex",
    // justifyContent:"space-between",
    backgroundColor:"#E5E5E5"
  },

  profileGridText: {
    fontSize:"1.25rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  profileGridIcon: {
    height:"1.75rem",
    width:"1.75rem",
    marginRight:"1rem",
    position:"relative",
    top:"0.1em",
    backgroundColor:"#BAE6FD",
    color:"#171717"
  },

  containerDate: {
    fontSize:"1.25rem",
    position:"absolute",
    top:"-0.7em",
    background:"white",
    marginLeft:"0.35rem"
  }

}));
