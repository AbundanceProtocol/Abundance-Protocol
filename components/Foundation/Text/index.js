import React from 'react';
import styled from '@emotion/styled';

const Text = ({children}, props) => {
    return (
        <StyledText {...props}>
            {children}
        </StyledText>
    )
}

const StyledText = styled.div`
   
`;

export default Text;