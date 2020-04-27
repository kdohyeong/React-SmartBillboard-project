import React from 'react'
import 'fabric'   
import DesignCanvas from './DesignCanvas'
// import CanvasItem from './CanvasItem'

class MakeCustom extends React.Component {
    
  render () {
    return (
      <div>
        <DesignCanvas>
        </DesignCanvas>
        
      </div>
  );   
    }
  }
  
export default MakeCustom;



//       <Circle radius={20} top={200} />
//       <Image url="https://http.cat/100" scale={0.2} top={100} />
