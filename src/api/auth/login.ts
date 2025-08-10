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
import { Router } from "express";
import { VerifyJson } from "../../middlewares";
import { UserLogin } from "../../util/schema/UserLogin";
import { db, SECRET_KEY } from "../../util";
import { IncorrectPasswordError, UserNotExistsError } from "../../util/errors";

const route = "/login";
const login = Router();

login.post(route, VerifyJson);
login.post(route, async (req, res) => {
  const { username, password } = await UserLogin.validate(req.body);

  const user = await db.user.findFirst({ where: { username } });
  if (!user) {
    throw new UserNotExistsError();
  }

  const passwordCorrect = await argon2.verify(user.password, password);
  if (!passwordCorrect) {
    throw new IncorrectPasswordError();
  }

  const token = jwt.sign({ username }, SECRET_KEY);

  res.json({ token });
});

export default login;
