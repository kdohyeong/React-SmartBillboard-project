import React from 'react';
import ReactPlayer from 'react-player'       // 웹서버 링크, 로컬 둘다 플레이 가능 

class ShowAI extends React.Component {
    render () {
      return (
        <div className="Player">
        <ReactPlayer padding='0' margin='0' width='100%' height='886px'
                     url={this.props.datas[0].src} loop playing/>
        </div>
     );
    }
  } 

  
export default ShowAI;
