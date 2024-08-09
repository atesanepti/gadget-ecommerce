import jwt from "jsonwebtoken";

const genToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  res.cookie("accessKey", token, {
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default genToken;
