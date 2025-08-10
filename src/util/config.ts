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

import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT);
const { SECRET_KEY } = process.env;

if (!SECRET_KEY || SECRET_KEY.length < 32) {
  console.error("SECRET_KEY must be 32 characters or more in length.");
  process.exit(1);
}

export { PORT, SECRET_KEY };
