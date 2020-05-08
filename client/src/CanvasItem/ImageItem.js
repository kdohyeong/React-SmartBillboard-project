import React, { Fragment }from 'react'  
import { dragAndDrop, removeCanvasEvent } from '../utils/DragDrop.js';

class ImageItem extends React.Component {


  componentDidMount(){ setTimeout(() => { dragAndDrop(null); }, 500); } 

  componentWillUnmount() { setTimeout(() => { removeCanvasEvent(); }, 500); }

  render() {
      return (
        
          <Fragment>

            {
              this.props.menuDatas.map((menuDatas) => {
                if (menuDatas.zTYPE === 'image') {
                  return ( <img draggable='true' src={menuDatas.src} width ={this.props.width / 2.2} height ={this.props.height / 4.5} alt="" /> );
                }
              return false; 
              })
            }

          </Fragment>
      );
  }
}

export default ImageItem;
