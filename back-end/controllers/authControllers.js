import User from "../db/User.js";
import "../db/config.js";

export const createUser = (req, res) => {
  let user = new User(req.body);
  user.save().then((data) => {
    res.send(data);
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = new User(req.body);
  const user = await User.findOne({ email });

  if (!user) return res.send({ message: "No user found" });

  console.log(user, password);

  if (user.password === password) {
    return res.send({ message: "Login success", data: user });
  }
  return res.send({ message: "Wrong password" });
};
