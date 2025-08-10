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
import { PointEdit, PointId } from "../../util/schema";
import { db } from "../../util/db";
import { Point } from "../../util/models";

const route = "/:pointId";
export const pointId = Router();

pointId.get(route, async (req, res) => {
  const { pointId } = await PointId.validate(req.params);
  const point: Point = await db.point.findFirstOrThrow({ where: { id: pointId } });

  res.json(point);
});

pointId.patch(route, async (req, res) => {
  const { pointId } = await PointId.validate(req.params);
  const data = await PointEdit.validate(req.body);

  await db.point.update({
    where: { id: pointId },
    data
  });

  res
    .status(204)
    .send();
});

pointId.delete(route, async (req, res) => {
  const { pointId } = await PointId.validate(req.params);

  await db.point.delete({
    where: { id: pointId }
  });

  res
    .status(204)
    .send();
});
