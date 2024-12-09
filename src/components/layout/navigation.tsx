import styled from "styled-components";
import logo from "../../assets/Frame 21.svg";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface NavigationProps {
    select: number;
    setSelect: (select: number) => void;
}
const Navigation = ({ select, setSelect }:NavigationProps) => {
    const navigate = useNavigate();
    return (
        <Container>
            <img src={logo} alt="logo" />
            <SelectionCon>
                <ContentBox isSelect={select == 0} onClick={() => setSelect(0)}>
                    <ContentText isSelect={select == 0}>
                        메르센 트위스터
                    </ContentText>
                </ContentBox>
                <ContentBox isSelect={select == 1} onClick={() => setSelect(1)}>
                    <ContentText isSelect={select == 1}>
                        중앙 제곱법
                    </ContentText>
                </ContentBox>
                <ContentBox isSelect={select == 2} onClick={() => setSelect(2)}>
                    <ContentText isSelect={select == 2}>
                        선형 합동법
                    </ContentText>
                </ContentBox>
                <ContentBox isSelect={select == 3} onClick={() => setSelect(3)}>
                    <ContentText isSelect={select == 3}>
                        XOR쉬프트
                    </ContentText>
                </ContentBox>
            </SelectionCon>

        </Container>
    );
}
export default Navigation;

const ContentText = styled.text<{isSelect}>`
    color: ${props => props.isSelect ? "#FFFFFF" : "#C2C2C2"};
    font-size: 16px;
    font-style: normal;
    font-weight: ${props => props.isSelect ? 600 : 500};
    line-height: normal;
    
`

const ContentBox = styled.div<{isSelect}>`
    cursor: pointer;
    display: flex;
    padding: 16px 24px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background-color: ${props => props.isSelect ? "#303030" : "transparent"};
`
const Container = styled.div`
    display: flex;
    width: 236px;
    background: #1F1F1F;
    height: 100vh;
    padding: 36px 0px;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    flex-shrink: 0;
`

const SelectionCon= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
`
