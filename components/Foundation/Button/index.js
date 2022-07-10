import React from 'react';
import styled from '@emotion/styled';

const Button = ({onClick= () => {}, variant = buttonVariants.default, children}, props) => {
    return (
        <StyledButton 
            onClick={onClick} 
            padding={variant.padding}
            background={variant.background}
            textColor={variant.textColor}
            hoverBackground={variant.hoverBackground}
            hoverText={variant.hoverText}
            border={variant.border}
            hoverBorder={variant.hoverBorder}
            borderRadius={variant.borderRadius}
            fontSize={variant.fontSize}
            {...props}
        >
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    display: grid;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: inter,sans-serif;
    font-weight: 700;
    font-size: ${props => props.fontSize ?? '15px'};

    padding: ${props => props.padding ?? '10px 20px'};
    color: ${props => props.textColor ?? '#123'};
    border-radius: ${props => props.borderRadius ?? '20px'};
    border: ${props => props.border ?? ' 1px solid #dcb'};
    background: ${props => props.background ?? '#dcb'};
    transition: all ease-in-out 0.1s;

    &:hover {
        color: ${props => props.hoverText ?? '#eee'};
        background: ${props => props.hoverBackground ?? '#fed'};
        border: ${props => props.hoverBorder ?? '1px solid #fed'};
        transition: all ease-in-out 0.1s;
    }

    &:disabled {
        cursor: disabled;
    }
`;


export const buttonVariants = {
    default: {
        background: '#dcb',
        border: '1px solid #dcb',
        textColor: '#123',
        hoverBackground: '#fed',
        hoverBorder: '1px solid #fed',
        hoverText: '#123',
        borderRadius: '20px',
        padding: '10px 40px',
        fontSize: '15px',
    },
    outlined: {
        background: 'transparent',
        border: '1px solid #dcb',
        textColor: '#dcb',
        hoverBackground: 'transparent',
        hoverBorder: '1px solid #fed',
        hoverText: '#fed',
        borderRadius: '20px',
        padding: '10px 20px',
        fontSize: '15px',
    },
    text: {
        background: 'transparent',
        border: 'none',
        textColor: '#eee',
        hoverBackground: 'transparent',
        hoverBorder: 'none',
        hoverText: '#fed',
        borderRadius: '20px',
        padding: '10px 20px',
        fontSize: '15px',
    },
    icon: {
        background: 'rgba(221, 204, 187, 0.144)', 
        border: 'none',
        textColor: '#eee',
        hoverBackground: 'rgba(255, 238, 221, 0.342)',
        hoverBorder: 'none',
        hoverText: '#eee', 
        borderRadius: '50%',
        padding: '10px',
        fontSize: '25px',
    },
}

export default Button;