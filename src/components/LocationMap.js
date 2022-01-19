import React, { useEffect } from "react";

const LocationMap = (props) => {
  const { location } = props;

  const { kakao } = window;

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);

    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(location, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 이미지 변경이 제대로 되지 않아 보류
        // let imgSrc =
        //   "https://toppng.com/uploads/preview/map-point-google-map-marker-gif-11562858751s4qufnxuml.png";
        // let imgSize = new kakao.maps.Size(64, 69);
        // let imgOption = { offset: new kakao.maps.Point(27, 69) };

        // let markerImage = new kakao.maps.MarkerImage(
        //   imgSrc,
        //   imgSize,
        //   imgOption
        // );

        let marker = new kakao.maps.Marker({
          map,
          position: coords,
          // image: markerImage,
        });

        map.setCenter(coords);
      }
    });

    // var markerPosition = new kakao.maps.LatLng(
    //   37.365264512305174,
    //   127.10676860117488
    // );
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
    // marker.setMap(map);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "30vw",
        minHeight: "200px",
        maxHeight: "300px",
      }}
    ></div>
  );
};

LocationMap.defaultProps = {
  location: "",
};

export default LocationMap;
