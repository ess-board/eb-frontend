import { createGlobalStyle } from "styled-components";

// GlobalStyle 정의
export const GlobalStyle = createGlobalStyle`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css");
    
    body {
        background-color: white; // 테마 값 사용
    }
    
    *, *::after, *::before {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;
