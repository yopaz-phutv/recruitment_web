/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import redLocationIcon from "../../../assets/images/icons/red_location.png";
import greenLocationIcon from "../../../assets/images/icons/green_location.png";
import { isNullObject } from "../../../common/functions";
import dayjs from "dayjs";

export default function JobMap({
  className,
  jobs,
  address,
  distance,
  refreshHint,
  setRefreshHint,
  setHintLocations,
  curLocation,
}) {
  const mapRef = useRef(null);
  const curMap = useRef(null);
  const mapGroup = useRef(null);
  const platform = useRef(null);
  const ui = useRef(null);
  const curMarker = useRef(null);

  var bubble;

  const openBubble = (position, content) => {
    if (!bubble) {
      bubble = new H.ui.InfoBubble(position, { content: content });
      ui.current.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(content);
      bubble.open();
    }
  };

  const addJobLocationsToMap = () => {
    var group = new H.map.Group(),
      i;
    var markerData = [];

    for (i = 0; i < jobs.length; i++) {
      let job = jobs[i];
      if (job.latitude && job.longitude) {
        if (
          curMarker.current &&
          distance &&
          new H.geo.Point(job.latitude, job.longitude).distance(
            curMarker.current.getGeometry()
          ) >
            1000 * distance
        )
          continue;

        if (markerData.length === 0) {
          markerData.push(job);
        } else {
          if (
            job.latitude === markerData[markerData.length - 1].latitude &&
            job.longitude === markerData[markerData.length - 1].longitude
          ) {
            markerData.push(job);
          } else {
            var marker = new H.map.Marker(
              {
                lat: markerData[0].latitude,
                lng: markerData[0].longitude,
              },
              {
                icon: new H.map.Icon(redLocationIcon, {
                  size: new H.math.Size(38, 38),
                }),
                data: markerData,
              }
            );
            group.addObject(marker);
            markerData = [job];
          }
        }
      }
    }
    // add last marker to map group:
    marker = new H.map.Marker(
      {
        lat: markerData[0].latitude,
        lng: markerData[0].longitude,
      },
      {
        icon: new H.map.Icon(redLocationIcon, {
          size: new H.math.Size(38, 38),
        }),
        data: markerData,
      }
    );
    group.addObject(marker);

    group.addEventListener(
      "tap",
      (evt) => {
        const jobs = evt.target.getData();
        var content = `<div style="width: 280px">`;

        for (let i = 0; i < jobs.length; i++) {
          let job = jobs[i];
          content += `
        <div class="pt-1 ${i !== jobs.length - 1 && "border-bottom"}">
          <a
            href=${`/jobs/${job.id}`}
            class="fw-600 text-decoration-none text-dark hover-text-main"
            target="_blank"
            rel="noreferrer"
          >
            ${job.jname}
          </a> <br />
          <div class="text-secondary ts-sm">${job.employer.name}</div>
          <div class="ts-xs d-flex gap-3">
            <div>
              ${
                job.min_salary
                  ? `${job.min_salary} - ${job.max_salary} triệu VND`
                  : "Theo thỏa thuận"
              }
            </div>
            <div>
              Còn 
              ${
                dayjs().diff(job.expire_at, "day") <= 30
                  ? dayjs(job.expire_at).diff(new Date(), "day")
                  : "30+"
              } ngày
            </div>
          </div>
        </div>
      `;
        }
        content += "</div>";
        openBubble(evt.target.getGeometry(), content);
      },
      false
    );
    curMap.current.addObject(group);
    curMap.current.setCenter(group.getBoundingBox().getCenter());
    curMap.current.setZoom(12);
    mapGroup.current = group;
  };

  const getHints = () => {
    var geocoder = platform.current.getSearchService();
    geocoder.geocode(
      {
        q: address,
      },
      (res) => setHintLocations(res.items),
      (error) => {
        console.log("Can't search for current address keyword!");
      }
    );
  };

  useEffect(() => {
    if (!curMap.current) {
      platform.current = new H.service.Platform({
        apikey: "6oHbb-JxL6jRASoosnCuzaDmWkAoeYkmbVlM9ewPd1s",
      });

      var defaultLayers = platform.current.createDefaultLayers();

      var map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      });

      window.addEventListener("resize", () => map.getViewPort().resize());
      // eslint-disable-next-line no-unused-vars
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      ui.current = H.ui.UI.createDefault(map, defaultLayers);

      curMap.current = map;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (curMap.current && jobs.length > 0) {
      if (mapGroup.current) mapGroup.current.removeAll();
      addJobLocationsToMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, curMap.current]);

  useEffect(() => {
    if (refreshHint) {
      getHints();
      setRefreshHint(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshHint]);

  useEffect(() => {
    if (!isNullObject(curLocation)) {
      if (curMarker.current) {
        curMap.current.removeObject(curMarker.current);
      }
      var marker = new H.map.Marker(curLocation.position, {
        icon: new H.map.Icon(greenLocationIcon, {
          size: new H.math.Size(38, 38),
        }),
      });
      marker.addEventListener(
        "tap",
        (evt) =>
          openBubble(
            evt.target.getGeometry(),
            `<div style="width: 200px">Vị trí của bạn/ Vị trí bạn chọn</div>`
          ),
        false
      );
      curMap.current.addObject(marker);
      curMap.current.setZoom(15);
      curMap.current.setCenter(curLocation.position);
      curMarker.current = marker;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curLocation]);

  return (
    <div className={className}>
      <div
        id="job-map"
        style={{ width: "100%", height: "580px" }}
        ref={mapRef}
      />
    </div>
  );
}
