import React from 'react';
//이게 있어야 util 사용가능
import 'fabric';  
import DesignCanvas from './DesignCanvas';
import './MakeCustom.css';

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