import React from 'react'  


class SendCanvas extends React.Component {


  render() {

      return (   
            <div className="send">
                <div style ={{color : "white"}}>만든 광고를 보여줄 날짜를 정해주세요.</div>
                <input type="date" className="date" style={{
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
