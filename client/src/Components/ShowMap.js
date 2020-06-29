import React, { Fragment } from 'react'; 
import './ShowMap.css';

//HOME의 상태가 CUSTOM 일때 뿌려주는 부분
class ShowMap extends React.Component {
    
    componentDidMount() {
        company__Map();
        window.addEventListener('resize', function() { company__Map(); }, false);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', company__Map, false);
    }
    render() {
    
        return (
            
            <Fragment>
                <div className="title">Map</div>
                <div className='Nav__map__board'>
                    <div id='map'></div>
                </div>
            </Fragment>

        );
    }
} 

  
export default ShowMap;

function company__Map() {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch('충청북도 청주시 서원구 충대로1', function(result, status) {

            // 정상적으로 검색이 완료됐으면
             if (status === window.kakao.maps.services.Status.OK) {

                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">현재 위치</div>'
                });
                infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
}