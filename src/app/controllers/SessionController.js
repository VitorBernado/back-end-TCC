import jwt from "jsonwebtoken";
import User from "../models/User";
import File from "../models/File";

import authConfig from "../../config/auth";

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password not match." });
    }

    const file = await File.findOne({
      where: { id: user.file_id },
    });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      file: file.path,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
