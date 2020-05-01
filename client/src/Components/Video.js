import React, { Fragment }from 'react'
import Fsrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/video/test.mp4';
import { dragAndDrop, removeCanvasEvent } from '../utils/DragDrop.js';

class Video extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          src1:"http://html5demos.com/assets/dizzy.mp4"
      }
    }

  componentDidMount() { dragAndDrop(null); }
  
  componentWillUnmount() { removeCanvasEvent(); }

  render() {
    return (
      <Fragment>
        <video draggable='true' src={Fsrc} width="150px" height="150px" muted poster="" />
        <video draggable='true' src={this.state.src1} width='150px' height='150px' poster="" loop />
      </Fragment>
    );
  }
}

export default Video
