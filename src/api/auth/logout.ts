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

import { Router } from "express";
import { Authentication } from "../../middlewares";
import { db } from "../../util";

const route = "/logout";
const logout = Router();

logout.post(route, Authentication);
logout.post(route, async (req, res) => {
  await db.invalidToken.create({
    data: {
      token: req.headers.authorization!
    }
  });

  res
    .status(204)
    .send();
});

export default logout;
