import React from 'react';
import ReactPlayer from 'react-player' 

class ShowCustom extends React.Component {
    render () {
        return (
          <div>
              {
              this.props.datas.map((data) => {
                if (data.type === 'video') {
                  return (
                    <ReactPlayer url={data.src} loop playing
                        width = {data.width}
                        height = {data.height}
                        top = {data.top}
                        left = {data.left}
                        position = 'fixed'
                        zIndex = {data.zIndex}
                    />
                   );
                }
                else if (data.type === 'image'){
                  return (
                  <img src ={data.src}
                      width = {data.width}
                      height = {data.height}
                      top = {data.top}
                      left = {data.left}
                      position = 'fixed'
                      zIndex = {data.zIndex}
                  ></img>
                  );
                } 
              })
              }
          </div>
       );
      }
    } 
  
  
export default ShowCustom;
