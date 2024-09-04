import React, { useState } from 'react';
import { Divider, Steps } from 'antd';
const StepPart = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const description = 'Créer un evenement';
  
  return (
    <>

      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            description,
      
          },
          {
            title: 'Step 2',
            
          },
          {
            title: 'Step 3',
          
          },
        ]}
      />

      <Divider />

     
    </>
  );
};
export default StepPart;