import React from 'react';
import styled from 'styled-components';

export const Icon = ({ src, ...refs }) => {
   return (
      <ImageS src={src} {...refs} />
   );
};


export default Icon;

const ImageS = styled.img`
   width:${p => p.width || 40}px;
   height: ${p => p.height || 40}px;
   /* border-radius: 50%; */
`;

