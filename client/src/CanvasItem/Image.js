import React, { Fragment }from 'react'
//웹에선 로컬주소를 불러올수없어서 import 시킴
import Isrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/test1.png';  
import { dragAndDrop, removeCanvasEvent } from '../utils/DragDrop.js';

class Image extends React.Component {

  constructor(props) {
    super(props);
        this.state = {
            src1:"http://placehold.it/150x150/848/fff",
            src2:"https://http.cat/100",
            src3:"http://placehold.it/220x220/848/000", 
            src4:"https://http.cat/302", 
           
        }
      }

  //componentDidMount() { dragAndDrop(null); }
  componentDidMount(){ setTimeout(() => { dragAndDrop(null); }, 500); } 

  componentWillUnmount() { setTimeout(() => { removeCanvasEvent(); }, 500); }

  render() {
    return (
        <Fragment>

        {
          this.props.menuDatas.map((menuDatas) => {
            if (menuDatas.zTYPE === 'image') {
              return (
                  <img draggable='true' src={menuDatas.src} width ='160' height ='150' alt="" />
                );
            }
          })
        }

        </Fragment>
    );
  }
}

export default Image
