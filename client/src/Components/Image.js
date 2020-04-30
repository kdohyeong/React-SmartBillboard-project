import React, { Fragment }from 'react'
import Isrc from 'C:/Users/KDHyeong/Desktop/React/smartbillboard/client/src/test1.png';     //웹에선 로컬주소를 불러올수없어서 import 시킴
import { dragAndDrop, removeCanvasEvent } from '../utils/canvas';

class Image extends React.Component {

  constructor(props) {
    super(props);
        this.state = {
            src1:"http://placehold.it/150x150/848/fff",
            src2:"https://http.cat/100",
            src3:"http://placehold.it/220x220/848/000", 
            src4:"http://html5demos.com/assets/dizzy.mp4",
            src5:"https://http.cat/302", 
            src6:"https://lh3.googleusercontent.com/proxy/Behma-2PNzGok16XGYQz8tStsyGAHpq8kanQl-BHgRYeUaKCtxPkNfzrpmXo4qUjcSDfySDecalkLUHstUIdc0Iym8IDl-oLeNceeEhh-dta1EH1F3v4UP1dFrOjgUgJMi69OlA2VT_N2uNyylBuiNen2hLVK788O3yRjV77hA",
        }
      }
  componentDidMount() {
    dragAndDrop(null);
  }

  componentWillUnmount() {
    removeCanvasEvent();
  }

  render() {
    return (
      <Fragment>
      <img draggable='true' src={this.state.src1} width='100' height='100' />
      <img draggable='true' src={Isrc} width='100' height='100' />
      <img draggable='true' src={this.state.src2} width='100' height='100' />
      <img draggable='true' src={this.state.src3} width='100' height='100' />
      <img draggable='true' src={this.state.src5} width='100' height='100' />
      <img draggable='true' src="https://i.pinimg.com/originals/e2/b7/da/e2b7da6bc749ba2d7ebdfda28fac6009.gif" width='100' height='100' />
      </Fragment>
    );
  }
}

export default Image
