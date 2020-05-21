import React from 'react'  

var $ = require('jquery'); 

class SendCanvas extends React.Component {
    

    
  render() {
    // var date = new Date();
    // var month = date.getUTCMonth() + 1; //months from 1-12
    // var day = date.getUTCDate();
    // var year = date.getUTCFullYear();
    // const day = date.getDay();
    // const hours = date.getHours();
    // console.log(date);

      return (   
            <div className="send">
                <div style ={{color : "white"}}>만든 광고를 보여줄 날짜를 정해주세요.</div>
                <input type="date" id="date" className="date" style={{
                    width : '200px',
                }}/>
                <input type="time" className="time" style={{
                    width : '200px',
                }} />
            </div>
      );
  }
}

export default SendCanvas;
