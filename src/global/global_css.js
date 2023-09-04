import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;

    }
    body{
        background-color: #323234;
    }
    span, h1, h2, h3, h4, h5, h6{
        color: white;
    }
    a{
        text-decoration:none !important;
    }
    textarea:focus, input:focus,button:focus, select:focus {
        box-shadow: 0 0 0 0 !important;
        outline: 0 !important;
    } 
    
`;
