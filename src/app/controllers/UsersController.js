/* eslint-disable no-unused-expressions */
import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "password_hash"] },
    });

    if (!user) {
      return res.status(404).json();
    }

    const { id, name, email, createdAt, updatedAt } = user;

    return res.json({ id, name, email, createdAt, updatedAt });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(8),
      phone: Yup.number().required(),
      passwordConfirmation: Yup.string().when("password", (password, field) => {
        password ? field.required().oneOf([Yup.ref("password")]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on Validate schema" });
    }

    const { id, name, email, phone, createdAt, updatedAt } = await User.create(
      req.body
    );

    return res
      .status(201)
      .json({ id, name, email, phone, createdAt, updatedAt });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      phone: Yup.number(),
      passwordConfirmation: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on Validate schema" });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "User password not match." });
    }

    const { id, name, email, createdAt, updatedAt } = await user.update(
      req.body
    );

    return res.status(201).json({ id, name, email, createdAt, updatedAt });
  }
}

export default new UserController();
