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
import { JwtData, MiddlewareFunction } from "../custom";
import { InvalidTokenError } from "../util/errors";
import { db, SECRET_KEY } from "../util";

export const Authentication: MiddlewareFunction = async (req, _, next) => {
  if (!req.headers.authorization) {
    throw new InvalidTokenError(); 
  }

  const invalidToken = await db.invalidToken.findFirst({
    where: { token: req.headers.authorization }
  });

  if (invalidToken) {
    throw new InvalidTokenError();
  }

  req.jwtData = jwt.verify(req.headers.authorization, SECRET_KEY) as JwtData;
  next();
};
