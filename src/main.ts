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

import express from "express";
import cors from "cors";
import { ErrorHandler, RedirectToPage } from "./middlewares";
import { api } from "./api";

const app = express();
const port = 1447;

app.use(express.json());
app.use(cors());
app.use(RedirectToPage);
app.use(api);
api.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
