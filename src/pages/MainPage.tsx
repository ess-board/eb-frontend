import Navigation from "../components/layout/navigation.tsx";
import Unset from "../components/section/Unset.tsx";
import CreateSection from "../components/section/CreateSection.tsx";
import useStore from "../store/Images.ts"; // zustand 상태
import {useEffect, useState} from "react";
import ViewSection from "../components/section/ViewSection.tsx";
import styled from "styled-components";
const MainPage = () => {
    const processId = useStore((state) => state.processId); // processId 상태
    const setProcessId = useStore((state) => state.setProcessId); // setProcessId 상태

    const [select, setSelect] = useState(0);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        console.log(processId);
    }, [processId]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100vw",
                height: "100vh", // 전체 높이
                overflow: "hidden", // 스크롤바 숨김
            }}
        >
            <Navigation select={select} setSelect={setSelect} />
            <ContentArea>
                {processId[select] !== "" && !isCreate && (
                    <ViewSection indx={select} />
                )}
                {processId[select] === "" && !isCreate && (
                    <Unset onButtonClick={() => setIsCreate(true)} />
                )}
                {isCreate && (
                    <CreateSection
                        indx={select}
                        onBackClick={() => setIsCreate(false)}
                    />
                )}
            </ContentArea>
        </div>
    );
};

const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-y: auto; /* 세로 스크롤 가능 */
`;

export default MainPage;
