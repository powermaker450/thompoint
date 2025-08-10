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
import { DefaultEventsMap, Server } from "socket.io";
import { db, PORT, ServerToClientEvents } from "./util";
import { Point } from "./util/models";

const app = express();
export const io = new Server<DefaultEventsMap, ServerToClientEvents>({
  cors: {
    origin: "*"
  }
});
const port = PORT || 1447;

app.use(express.json());
app.use(cors());
app.use(RedirectToPage);
app.use(api);
api.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

io.listen(port + 1);

io.on("connection", async socket => {
  console.log(`${socket.id} connected`);
  const points: Point[] = await db.point.findMany();
  socket.emit("READY", points);

  socket.on("disconnect", reason => {
    console.log(`${socket.id} disconnected: ${reason}`);
  });
});
