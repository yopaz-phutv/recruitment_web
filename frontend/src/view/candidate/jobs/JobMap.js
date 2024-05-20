/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function JobMap({ className, jobs }) {
  const mapRef = useRef(null);
  const curMap = useRef(null);
  const mapGroup = useRef(null);
  const platform = useRef(null);
  const ui = useRef(null);

  var bubble;

  const [distance, setDistance] = useState(0);
  const [address, setAddress] = useState("");

  function geocode(platform) {
    var geocoder = platform.getSearchService(),
      geocodingParameters = {
        q: "hai ba trung",
      };

    geocoder.geocode(
      geocodingParameters,
      (result) => {
        var locations = result.items;
        addLocationsToMap(locations);
      },
      (error) => {
        alert("Can't reach the remote server");
      }
    );
  }

  function openBubble(position, text) {
    const content = `<div class="text-danger">${text}</div>`;
    if (!bubble) {
      bubble = new H.ui.InfoBubble(position, { content: content });
      ui.current.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(content);
      bubble.open();
    }
  }

  // const addLocationsToMap = (ui, locations) => {
  //   var group = new H.map.Group();

  //   for (let i = 0; i < locations.length; i += 1) {
  //     let location = locations[i];
  //     var marker = new H.map.Marker(location.position);
  //     marker.label = location.address.label;
  //     group.addObject(marker);
  //   }

  //   group.addEventListener(
  //     "tap",
  //     (evt) => {
  //       curMap.current.setCenter(evt.target.getGeometry());
  //       openBubble(ui, evt.target.getGeometry(), evt.target.label);
  //     },
  //     false
  //   );

  //   curMap.current.addObject(group);
  //   curMap.current.setCenter(group.getBoundingBox().getCenter());
  // };
  const addLocationsToMap = () => {
    var group = new H.map.Group();

    for (let i = 0; i < jobs.length; i += 1) {
      let job = jobs[i];
      if (job.latitude && job.longitude) {
        var marker = new H.map.Marker({
          lat: job.latitude,
          lng: job.longitude,
        });
        marker.label = job.jname;
        group.addObject(marker);
      }
    }

    group.addEventListener(
      "tap",
      (evt) => {
        // curMap.current.setCenter(evt.target.getGeometry());
        openBubble(evt.target.getGeometry(), evt.target.label);
      },
      false
    );
    curMap.current.addObject(group);
    curMap.current.setCenter(group.getBoundingBox().getCenter());
    curMap.current.setZoom(12);
    mapGroup.current = group;
  };

  const moveMapToAPoint = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        curMap.current.setZoom(15);
        console.log(
          "kkk:",
          position.coords.latitude,
          position.coords.longitude
        );
        const curLoc = { lat: 20.82865825186767, lng: 106.09522300218937 };
        var marker = new H.map.Marker(curLoc);
        curMap.current.addObject(marker);
        curMap.current.setCenter(curLoc);
      });
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      if (mapGroup.current) mapGroup.current.removeAll();
      addLocationsToMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs]);

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
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      ui.current = H.ui.UI.createDefault(map, defaultLayers);
      curMap.current = map;

      // geocode(ui, platform.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <div className="d-flex gap-2 mb-1" style={{ width: "500px" }}>
        <Form.Control
          type="type"
          size="sm"
          aria-label="address-input"
          placeholder="Nhập địa điểm"
          className="border-main"
          style={{ width: "63%" }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <InputGroup size="sm" style={{ width: "37%" }}>
          <Form.Control
            type="number"
            aria-label="job-distance-input"
            placeholder="Nhập khoảng cách"
            className="border-main border-end-0"
            onChange={(e) => setDistance(e.target.value)}
          />
          <InputGroup.Text className="bg-white border-main border-start-0">
            km
          </InputGroup.Text>
        </InputGroup>
      </div>
      <div
        id="job-map"
        style={{ width: "100%", height: "500px" }}
        ref={mapRef}
      />
      <button onClick={moveMapToAPoint}>Move Map to a point</button>
    </div>
  );
}
