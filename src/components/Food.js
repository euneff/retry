import React  from 'react'
import seafood from './seafood.jpg';

const Food = () => {
  
  return (
    <div>
      <div className="container" style={{width:'600px', height:'500px'}}> 
      <img src={seafood} alt="해물순두부찌개사진" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
       {/* 사진 넣을까 */}
      </div>

      <h3 className="py-5 my-5" > 
        내가 가장 좋아하는 순두부찌개는 
        <br>
        <div style={{fontWeight:'700'}}> 해물순두부찌개 </div> 
        </br>
      </h3>  
      </div>
  )
}

export default Food