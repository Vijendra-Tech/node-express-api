import prisma from "./../../db";
import { comparePassword, createJWT, hashPsw } from "../modules/auth";

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPsw(req.body.password),
    },
  });
  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = await comparePassword(req.body.password, user?.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  if (user) {
    const token = createJWT(user);
    res.json({ token });
  } else {
    throw new Error("User not found!");
  }
};
