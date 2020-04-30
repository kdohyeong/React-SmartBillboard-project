import React from 'react'
import 'fabric'   
import DesignCanvas from './DesignCanvas'
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