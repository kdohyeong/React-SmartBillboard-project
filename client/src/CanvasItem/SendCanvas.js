import React, { Fragment } from 'react'  
import axios from 'axios';


class SendCanvas extends React.Component {

  //캔버스에서 만든 내용물을 ToJSON형식으로 서버로 보냄
  addCanvasDataApi = (canvasDatas) => {
    const canvasDataUrl = this.props.mainUrl + 'canvasDatas';
    const url = `${canvasDataUrl}`;
    axios.post( url , { canvasDatas })
    .then( response => { console.log(response) } )
    .catch( response => { console.log(response) } );
  }


  render() {
    // var date = new Date();
    // var month = date.getUTCMonth() + 1; //months from 1-12
    // var day = date.getUTCDate();
    // var year = date.getUTCFullYear();
    // const day = date.getDay();
    // const hours = date.getHours();
    // console.log(date);

      return ( 
        <Fragment>  
            <div className="sendcontainer" style={{
              width :"100%",
              height : "100%",
              backgroundColor : "#333",
              opacity : "0.3", 
              position : "fixed",
              left : "0",
              top : "0",
              zIndex : "10"
            }}/>

            
            <div className="send" style={{ zIndex : "15" }}>
                <div style ={{color : "white"}}>만든 광고를 보여줄 날짜를 정해주세요.</div>
                <input type="date" id="date" className="date" style={{
                    width : '200px',
                }} />
                <input type="time" className="time" style={{
                    width : '200px',
                }} />
                <button className="sendbutton" id="sendbutton" onClick={(e) =>{ e.preventDefault(); this.addCanvasDataApi(this.props.canvas.toJSON()) }}>저장하기</button>
            </div>
          </Fragment>
      );
  }
}

export default SendCanvas;
