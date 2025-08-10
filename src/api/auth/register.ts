/*
 * thompoint - Create random points on the island to see and comment on 
 * Copyright (C) 2025  povario
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { UserRegister } from "../../util/schema";
import { Router } from "express";
import { db, SECRET_KEY } from "../../util";
import { UsernameExistsError } from "../../util/errors";
import { VerifyJson } from "../../middlewares";

const route = "/register";
const register = Router();

register.post(route, VerifyJson);
register.post(route, async (req, res) => {
  const {
    username,
    password: unhashed
  } = await UserRegister.validate(req.body);

  const usernameExists = await db.user.findFirst({ where: { username } });
  if (usernameExists) {
    throw new UsernameExistsError();
  }

  const password = await argon2.hash(unhashed);
  await db.user.create({
    data: { username, password }
  });

  const token = jwt.sign({ username }, SECRET_KEY!);
  res
    .status(201)
    .json({ token });
});

export default register;
