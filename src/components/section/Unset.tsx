import styled from "styled-components";
import error from "../../assets/error.svg";
interface UnsetProps {
    onButtonClick: () => void;
}
const Unset =({onButtonClick}:UnsetProps) => {
    return (
        <Container>
            <MessageContainer>
                <ContentContainer>
                    <img src={error} alt="error"/>
                    <ErrorMsg>
                        아직 이미지가 생성이 되지 않았습니다.
                    </ErrorMsg>
                </ContentContainer>

                <CreateButton onClick={onButtonClick}>
                    <ButtonText>생성하기</ButtonText>

                </CreateButton>
            </MessageContainer>
        </Container>

    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

const MessageContainer = styled.div`
    display: flex;
    width: 243px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`

const ErrorMsg = styled.text`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 17px;
    align-self: stretch;
`

const CreateButton = styled.div`
    cursor: pointer;
    display: flex;
    border-radius: 11px;
    background: #000;
    padding: 12px 22px;
    justify-content: center;
    align-items: center;
    gap: 4px;
`

const ButtonText = styled.text`
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`
export default Unset;
