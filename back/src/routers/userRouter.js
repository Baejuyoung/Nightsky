import { Router } from "express";
import passport from "passport";
import { User } from "../db/models/User.js";
const userRouter = Router();

// 콜백 URL
userRouter.get("/complete", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect("/user/success");
  } else {
    res.redirect("/user/failed");
  }
});

userRouter.get(
  "/googlecomplete",
  passport.authenticate("google"),
  (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.redirect("/user/success");
    } else {
      res.redirect("/user/failed");
    }
  }
);

userRouter.get("/navercomplete", passport.authenticate("naver"), (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect("/user/success");
  } else {
    res.redirect("/user/failed");
  }
});

userRouter.get("/kakaocomplete", passport.authenticate("kakao"), (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect("/user/success");
  } else {
    res.redirect("/user/failed");
  }
});

userRouter.get("/localcomplete", (req, res) => {
  passport.authenticate("local");
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect("/user/success");
  } else {
    res.redirect("/user/failed");
  }
});

//Logout

userRouter.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      console.log(err);
      res.send("error");
    });
    res.send(true);
  } else {
    res.redirect("/user/failed");
  }
});

//CallBack Url이 리다이렉트 하는 경로

userRouter.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(true);
  } else {
    res.send(false);
  }
});

userRouter.get("/failed", (req, res) => {
  res.send(false);
});
// 회원가입

userRouter.post("/signup", async (req, res) => {
  const { email, pw } = req.body;
  const social = "local";
  const result = await User.createUser({ email, pw, social });
  console.log(result);
  if (result == null) {
    res.send(false);
  } else {
    res.send(true);
  }
});

export { userRouter };