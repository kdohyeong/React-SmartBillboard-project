import React from 'react';
import ReactPlayer from 'react-player'       // 웹서버 링크, 로컬 둘다 플레이 가능 

class ShowAI extends React.Component {
    render () {
      return (
        <div className="Player">
        <ReactPlayer padding='0' margin='0' width='100%' height='700px'   //노트북 height  700 , 집 모니터 886
                     url={this.props.datas[0].src} loop playing/>
        </div>
     );
    }
  } 

  
export default ShowAI;


// html 을 사이즈 고정하고 , 그 안에 컨텐츠를 %으로 지정해서 어디든 반응형 풀스크린으로 하는방법 구글링 ㄱ

// 만들기 기능에서 컨버스도 사이즈 똑같이 해주고 20 : 80 좌우 나눠서 데이터 + 캔버스 

// 컨버스 뜯어보고 html 로 변환하는 법 찾기
