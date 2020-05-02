import React, { Fragment }from 'react'
import Fsrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test.mp4';
import Fsrc2 from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test2.mp4';
import Fsrc3 from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test3.mp4';
import { dragAndDrop, removeCanvasEvent } from '../utils/DragDrop.js';

class Video extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          src1:"http://html5demos.com/assets/dizzy.mp4",
          src2:"https://www.youtube.com/watch?v=SOE1A9p8KLw"
      }
    }

  componentDidMount() { dragAndDrop(null); }
  
  componentWillUnmount() { removeCanvasEvent(); }

  render() {
    return (
        <Fragment>

          <video draggable='true' src={Fsrc} width='160' height='150' muted poster="" />
          <video draggable='true' src={Fsrc2} width='160' height='150' muted poster="" loop />
          <video draggable='true' src={Fsrc3} width='160' height='150' muted poster="" loop />
          <video draggable='true' src={this.state.src1} width='160' height='150' poster="" loop />
          
        </Fragment>
    );
  }
}

export default Video
