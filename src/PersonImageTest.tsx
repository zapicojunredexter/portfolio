import React from 'react';

const PersonImageTest: React.FC = () => {
  const personFrames = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid black',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }}>
      <h3>Person Image Test</h3>
      {personFrames.map(frame => {
        const imagePath = `${process.env.PUBLIC_URL}/person/person${frame}.png`;
        return (
          <div key={frame} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Frame {frame}:</span>
            <img 
              src={imagePath}
              alt={`Person ${frame}`}
              style={{ width: '30px', height: '30px', border: '1px solid #ccc' }}
              onLoad={() => console.log(`✅ Person${frame} loaded`)}
              onError={() => console.error(`❌ Person${frame} failed to load: ${imagePath}`)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonImageTest; 