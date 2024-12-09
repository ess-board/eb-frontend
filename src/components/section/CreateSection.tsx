import React, { useState } from "react";
import styled from "styled-components";
import backarrow from "../../assets/arrow_back_ios.svg";
import zip from "../../assets/Frame 52.svg";
import Loading from "../../assets/Loding.json";
import Complete from "../../assets/Complete.json";
import Lottie from "lottie-react";
import useStore from "../../store/Images.ts";

interface UnsetProps {
    indx: number;
    onBackClick: () => void;
}
const CreateSection = ({ onBackClick, indx }: UnsetProps) => {
    const zprocessId = useStore((state) => state.processId); // processId만 가져옴
    const zsetProcessId = useStore((state) => state.setProcessId); // setProcessId 가져옴

    const [state, setState] = useState<"idle" | "loading" | "complete" | "completeMess">("idle");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [processId, setProcessId] = useState<string | null>(null);
    const completeMess = () => {
        setState("completeMess");
        setTimeout(() => {
            setState("complete");
        }, 2000);
    }

    const completeSpawnMess = () => {
        setState("completeMess");
        setTimeout(() => {
            onBackClick();
        }, 2000);
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            console.log("선택된 파일:", file.name);
            setState("loading");

            try {
                const formData = new FormData();
                formData.append("zip_file", file);

                const response = await fetch(
                    "https://raises-fired-complicated-country.trycloudflare.com/api/vae/dataset/upload_zip/",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    console.log("API 응답:", result);
                    if (result.status === "success") {
                        completeMess();
                        setProcessId(result.process_id);
                    } else {
                        alert(`업로드 실패: ${result.message}`);
                    }
                } else {
                    console.error("파일 업로드 실패:", response.status, await response.text());
                    alert("파일 업로드에 실패했습니다.");
                }
            } catch (error) {
                console.error("파일 업로드 중 오류 발생:", error);
                alert("파일 업로드 중 오류가 발생했습니다.");
            }
        }
    };
    const handleSpawnClick = async () => {
        if (!processId) {
            alert("먼저 파일을 업로드해 주세요.");
            return;
        }

        setState("loading");

        try {
            // 쿼리 파라미터를 URL에 포함
            const url = new URL(
                "https://raises-fired-complicated-country.trycloudflare.com/api/vae/eval/"
            );
            let algorithm = "mt";
            if (indx === 0) algorithm="lc";
            if (indx === 1) algorithm="mt";
            if (indx === 2) algorithm="ms";
            if (indx === 3) algorithm="mt";
            url.searchParams.append("process_id", processId);
            url.searchParams.append("num_images", "20");
            url.searchParams.append("algorithm", "mt");

            const response = await fetch(url.toString(), {
                method: "POST", // GET 방식으로 요청
            });

            if (response.ok) {
                const result = await response.json();
                console.log("생성 요청 성공:", result);
                zsetProcessId(indx, processId);

                // 생성 완료 처리
                completeSpawnMess();

            } else {
                console.error("생성 요청 실패:", response.status, await response.text());
                alert("생성 요청에 실패했습니다.");
                setState("idle");
            }
        } catch (error) {
            console.error("생성 요청 중 오류 발생:", error);
            alert("생성 요청 중 오류가 발생했습니다.");
            setState("idle");
        }
    };



    const handleTrainClick = async () => {
        if (!processId) {
            alert("먼저 파일을 업로드해 주세요.");
            return;
        }

        setState("loading");

        try {
            const response = await fetch(
                `https://raises-fired-complicated-country.trycloudflare.com/api/vae/train/train/?process_id=${processId}&epochs=30`,
                {
                    method: "POST",
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("학습 요청 성공:", result);

                // 학습 완료 처리
                completeMess();
            } else {
                console.error("학습 요청 실패:", response.status, await response.text());
                alert("학습 요청에 실패했습니다.");
                setState("idle");
            }
        } catch (error) {
            console.error("학습 요청 중 오류 발생:", error);
            alert("학습 요청 중 오류가 발생했습니다.");
            setState("idle");
        }
    };

    return (
        <Container>
            {( state === "loading" || state === "completeMess" ) && (
                <LoadingContainer>
                    <LoadingContainerContainer>
                        {state === "loading" && (
                            <>
                                <Lottie animationData={Loading} style={{width: 120}}/>
                                <InfoText>로딩중...</InfoText>
                            </>
                        )}
                        {state === "completeMess" && (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        width: 120,
                                        height: 120,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Lottie loop={false} animationData={Complete} style={{width: 48, height: 48}}/>
                                </div>
                                <InfoText>성공!</InfoText>
                            </>
                        )}
                    </LoadingContainerContainer>
                </LoadingContainer>
            )}
            <Topbar onClick={onBackClick}>
                <img src={backarrow} alt="뒤로가기"/>
                <TobBarText>뒤로가기</TobBarText>
            </Topbar>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ContentContainer>
                <ExBuContainer>
                            <ContentContContainer>
                                <Titletext>1. 이미지 업로드</Titletext>
                                <label style={{width: "100%"}}>
                                    <HiddenFileInput
                                        type="file"
                                        accept=".zip"
                                        onChange={handleFileChange}
                                    />
                                    <ZipButton isSelect={selectedFile}>
                                        <img src={zip} alt="파일 선택"/>
                                    </ZipButton>
                                </label>
                            </ContentContContainer>
                            <LearningContainer>
                                <ContentContContainer>
                                    <Titletext>2. 학습하기</Titletext>
                                    <LearningButton onClick={handleTrainClick}>
                                        <LearningButtonContainer>학습하기</LearningButtonContainer>
                                    </LearningButton>
                                </ContentContContainer>
                            </LearningContainer>
                        </ExBuContainer>
                        <SpawnButton onClick={handleSpawnClick}>
                            <SpawnText>생성하기</SpawnText>
                        </SpawnButton>
                    </ContentContainer>
                </div>
        </Container>
);
};


const LoadingContainerContainer = styled.div`
display: flex;
width: 345px;
padding: 36px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 24px;
flex-shrink: 0;
border-radius: 24px;
background: #FFF;
`

const LoadingContainer = styled.div`
    display: flex;
    position: absolute; /* 부모(Container) 내부에서 절대 위치 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 정확히 중앙에 배치 */
    background: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
    z-index: 100;
    width: 100%;
    height: 100%;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const ZipButton = styled.div<{isSelect}>`
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: 2px solid ${props => props.isSelect ? "#C2C2C2" : "#000"};
    border-radius: 11px;
    background-color: ${props => props.isSelect ? "#f9f9f9" : "#FFF"};
    font-size: 14px;
    color: ${props => props.isSelect ? "#333" : "#000"};
`;

const SpawnText = styled.text`
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const SpawnButton = styled.div`
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 11px;
    background: #000;
`
const InputContainer = styled.input`
    display: flex;
    padding: 12px;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 11px;
    border: 2px solid black;
`
const InfoText = styled.text`
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export default CreateSection;

const LearningButtonContainer = styled.text`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

const LearningButton = styled.div`
    cursor: pointer;
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 11px;
    border: 2px solid #000;
`

const LearningContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;    
`

const ContentContContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    align-self: stretch;    
`

const Titletext = styled.text`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const Topbar = styled.div`
    position: fixed;
    cursor: pointer;
    display: flex;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 9px;
`
const TobBarText = styled.text`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
    position: relative; /* Container 내부에서 절대 위치를 기준으로 할 수 있도록 설정 */
`;

const ContentContainer = styled.div`
    display: flex;
    width: 312px;
    flex-direction: column;
    align-items: flex-start;
    gap: 48px;
`

const ExBuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
`

