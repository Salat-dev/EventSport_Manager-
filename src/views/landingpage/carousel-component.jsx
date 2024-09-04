import React from 'react';
import { Carousel } from 'antd';
import i5 from '../landingpage/img/i5.jpg'
import i1 from '../landingpage/img/i1.jpg'

const contentStyle = {
  height: '800px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#000',
};
const CarouselComponent = () => (
  <Carousel autoplay>
    <div>
   
      <h3 style={contentStyle}>
      <img src={i5} alt="Berry" width="100%" height="200%"/>
      </h3>
    </div>
    
    <div>
      <h3 style={contentStyle}>
      <img src={i1} alt="Berry" width="100%" height="150%"/>

      </h3>
    </div>
    
   
  </Carousel>
);
export default CarouselComponent;