deltas = [-100, -4, -1, 0]

map = {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const tile = d3.tile()
      .extent([[0, 0], [width, height]])
      .tileSize(512)
      .clampX(false);

  const zoom = d3.zoom()
      .scaleExtent([1 << 8, 1 << 22])
      .extent([[0, 0], [width, height]])
      .on("zoom", (event) => zoomed(event.transform));

  const levels = svg.append("g")
      .attr("pointer-events", "none")
    .selectAll("g")
    .data(deltas)
    .join("g")
      .style("opacity", showlayers ? 0.3 : null);

  svg
      .call(zoom)
      .call(zoom.transform, mutable transform);

  function zoomed(transform) {
    mutable transform = transform;

    levels.each(function(delta) {
      const tiles = tile.zoomDelta(delta)(transform);

      d3.select(this)
        .selectAll("image")
        .data(tiles, d => d)
        .join("image")
          .attr("xlink:href", d => url(...d3.tileWrap(d)))
          .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
          .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
          .attr("width", tiles.scale)
          .attr("height", tiles.scale);
    });
  }

  return svg.node();
}

mutable transform = d3.zoomIdentity.translate(width >> 1, height >> 1).scale(1 << 12)


url = (x, y, z) => `https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg`

height = 600

import {d3} from "@d3/seamless-zoomable-map-tiles"

d3 = require("d3@6", "d3-tile@1")