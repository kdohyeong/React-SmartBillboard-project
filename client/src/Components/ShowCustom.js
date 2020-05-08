import React, { Fragment } from 'react'; 
import './MakeCustom.css'
import ShowImage from '../ShowItem/ShowImage.js';
import ShowVideo from '../ShowItem/ShowVideo.js';
import ShowText from '../ShowItem/ShowText.js';


class ShowCustom extends React.Component {

  render() {

      return (

        <Fragment>
          
          <div className='back' style={{ backgroundColor : this.props.datas[0].background }}/> 
            {
              this.props.datas.map((data) => {
                  if (data.zType === 'video') {
                    return ( <ShowVideo data={data}/> );
                  }
                  else if (data.zType === 'image'){
                    return ( <ShowImage data={data}/> );
                  }
                  else if (data.zType === 'i-text'){
                    return ( <ShowText data={data}/> )
                  }
                return false;
              })
            }

        </Fragment>

      );
    }
  } 

  
export default ShowCustom;
