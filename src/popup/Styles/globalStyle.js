import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body{
        width: 800px;
        height: 600px;
        overflow: scroll;
        font-size: 16px;
        overscroll-behavior: none;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    input, button{
        &:focus, &:active{
            outline:none
        }
    }
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
`;

export default GlobalStyle;
