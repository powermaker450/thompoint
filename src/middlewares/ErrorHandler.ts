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

import { NextFunction, Request, Response } from "express";
import { ClientError } from "../util/errors";
import { ValidationError } from "yup";

export function ErrorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
): void {
  if (!err) {
    return next();
  }

  console.log(err);

  if (err instanceof ClientError || err instanceof ValidationError) {
    res
      .status(400)
      .json({ name: err.name, message: err.message });
  } else if (err.name === "PrismaClientKnownRequestError") {
    res
      .status(404)
      .json({ name: "NotFoundError", message: "not found" });
  } else {
    res
      .status(500)
      .json({ name: "Internal Server Error", message: "Unknown error" });
  }
}
