const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const cors = require("cors");

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// import authentication middlewares
const { isAdmin, isEditor } = require("./middlewares/authenticate");

// import all routes
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const postQueryRouter = require("./routes/postQuery");
const categoryRouter = require("./routes/category");

//initialize express server
const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// csrf middleware
const csrfMiddleware = csrf({ cookie: true });
app.all("*", (req, res, next) => {
  res.cookie("csrfToken", req.csrfToken);
  next();
});
// all routes
app.use(authRouter);
app.use(postRouter);
app.use(postQueryRouter);
app.use(categoryRouter);

app.get("/", (req, res) => {
  let dateObj = new Date();
  let time = dateObj.toLocaleTimeString()

  res.json({ msg: "hello express api", time: `${time} ${dateObj.toDateString()}` });
});
app.get("/getUser", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    let users = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      users.push({ id, ...data });
      // res.json(snapshot.docs)
    });
    res.status(200).json({ users });
  } catch (e) {
    res.json({ err: e });
  }

  // res.json({msg:"hello users api"})
});
app.post("/addUser", async (req, res) => {
  try {
    await db.collection("users").add(req.body);
    res.json({ msg: "user added successfully" });
  } catch (e) {
    res.json({ err: e });
  }
});

app.get("/testAuth", isEditor, (req, res) => {
  res.json({ role: "Admin", Uid: req.uid, data: req.data });
});

//define google cloud function name - api
exports.api = functions.https.onRequest(app);
