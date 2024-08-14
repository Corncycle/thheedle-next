/**
 *            █
 *        -0.5,2.0
 *     █           \
 * -1.5,1.5             \
 *          \               █
 *               \       1.5,1.0
 *                   █      |
 *                0.5,0.5   |
 *            █      |      █
 *        -0.5,0.0\  |  /1.5,0.0
 *            |      █
 *            |   0.5,-0.5
 *            |      |
 *            |      █
 *            |  /0.5,-1.5
 *            █
 *        -0.5,-2.0
 */

export interface Region {
  above: { m: number; b: number }[]
  below: { m: number; b: number }[]
  right: { x: number }[]
  left: { x: number }[]
}

export interface LabeledPoint {
  x: number
  y: number
  z: number
  region: 'top' | 'mid' | 'bot'
}

export interface Point {
  x: number
  y: number
}

export const topRegion: Region = {
  above: [{ m: -0.5, b: 0.75 }],
  below: [
    { m: 0.5, b: 2.25 },
    { m: -0.5, b: 1.75 },
  ],
  right: [],
  left: [{ x: 1.5 }],
}

export const midRegion: Region = {
  above: [{ m: 0.5, b: -0.75 }],
  below: [{ m: -0.5, b: 0.75 }],
  right: [{ x: 0.5 }],
  left: [],
}

export const botRegion: Region = {
  above: [{ m: 0.5, b: -1.75 }],
  below: [{ m: -0.5, b: -0.25 }],
  right: [{ x: -0.5 }],
  left: [{ x: 0.5 }],
}

export function regionContainsPoint(region: Region, p: Point) {
  for (const a of region.above) {
    if (p.y < a.m * p.x + a.b) {
      return false
    }
  }
  for (const b of region.below) {
    if (p.y > b.m * p.x + b.b) {
      return false
    }
  }
  for (const r of region.right) {
    if (p.x < r.x) {
      return false
    }
  }
  for (const l of region.left) {
    if (p.x > l.x) {
      return false
    }
  }
  return true
}

function modelContainsPoint(p: Point) {
  return (
    regionContainsPoint(topRegion, p) ||
    regionContainsPoint(midRegion, p) ||
    regionContainsPoint(botRegion, p)
  )
}

// prettier-ignore
export const verts2d: number[] = [
  0.5, -1.5,
  0.5, -0.5,
  -0.5, 0,

  -0.5, 0,
  -0.5, -2,
  0.5, -1.5,

  0.5, 0.5,
  0.5, -0.5,
  1.5, 0,

  1.5, 0,
  1.5, 1,
  0.5, 0.5,

  1.5, 1,
  -1.5, 1.5,
  0.5, 0.5,

  1.5, 1,
  -0.5, 2,
  -1.5, 1.5,
]

export const verts3d: number[] = []

// given a pair of xy vertices, push a quad where z varies from 1 to 0 onto the vertex array
function extrude(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  vArray: number[]
) {
  // front faces
  vArray.push(x1, y1, 1)
  vArray.push(x1, y1, 0)
  vArray.push(x2, y2, 1)

  vArray.push(x2, y2, 1)
  vArray.push(x1, y1, 0)
  vArray.push(x2, y2, 0)
}

// front faces
for (let i = 0; i < verts2d.length; i += 6) {
  verts3d.push(verts2d[i], verts2d[i + 1], 1.0)
  verts3d.push(verts2d[i + 2], verts2d[i + 3], 1.0)
  verts3d.push(verts2d[i + 4], verts2d[i + 5], 1.0)

  verts3d.push(verts2d[i], verts2d[i + 1], 0)
  verts3d.push(verts2d[i + 2], verts2d[i + 3], 1)
  verts3d.push(verts2d[i + 4], verts2d[i + 5], 1)

  verts3d.push(verts2d[i], verts2d[i + 1], 1)
  verts3d.push(verts2d[i + 2], verts2d[i + 3], 1)
  verts3d.push(verts2d[i + 4], verts2d[i + 5], 0)

  // verts3d.push(verts2d[i], verts2d[i + 1], 0)
  // verts3d.push(verts2d[i + 2], verts2d[i + 3], 0)
  // verts3d.push(verts2d[i + 4], verts2d[i + 5], 0)
}

// extruding faces
for (let i = 0; i < verts2d.length; i += 6) {
  extrude(verts2d[i], verts2d[i + 1], verts2d[i + 2], verts2d[i + 3], verts3d)
  // prettier-ignore
  extrude(verts2d[i + 2], verts2d[i + 3], verts2d[i + 4], verts2d[i + 5], verts3d)
  // extrude(verts2d[i + 4], verts2d[i + 5], verts2d[i], verts2d[i + 1], verts3d)
}

extrude(verts2d[0], verts2d[1], verts2d[4], verts2d[5], verts3d)
