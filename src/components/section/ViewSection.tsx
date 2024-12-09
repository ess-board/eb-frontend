import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../store/Images.ts";

interface ViewSectionProps {
    indx: number;
}

const ViewSection = ({ indx }: ViewSectionProps) => {
    const processIds = useStore((state) => state.processId); // processId 가져오기
    const processId = processIds[indx]; // 현재 인덱스에 해당하는 processId
    const [images, setImages] = useState<string[]>([]); // 이미지 URL 저장

    // 이미지 불러오기
    useEffect(() => {
        if (processId) {
            const fetchImages = async () => {
                try {
                    const imageUrls = [];
                    for (let i = 0; i < 20; i++) {
                        const imageUrl = `https://raises-fired-complicated-country.trycloudflare.com/api/vae/eval/get_image/${processId}/${i}`;
                        imageUrls.push(imageUrl);
                    }
                    setImages(imageUrls);
                } catch (error) {
                    console.error("이미지 로드 오류:", error);
                }
            };
            fetchImages();
        }
    }, [processId]);

    return (
        <Container>
            <ContainerTitle>
                <TitleText>
                    {indx === 0 && "메르센 트위스터"}
                    {indx === 1 && "중앙 제곱법"}
                    {indx === 2 && "선형 합동법"}
                    {indx === 3 && "XOR쉬프트"}
                </TitleText>
            </ContainerTitle>
            <ImageGrid>
                {images.map((url, idx) => (
                    <ImageItem key={idx} src={url} alt={`이미지 ${idx}`} />
                ))}
            </ImageGrid>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 24px;
`;

const ContainerTitle = styled.div`
    display: flex;
    padding: 24px 24px 48px 24px;
    justify-content: center;
    align-items: center;
    gap: 9px;
`;

const TitleText = styled.text`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개씩 배치 */
    grid-gap: 16px; /* 이미지 간격 */
    width: 100%;
    padding: 16px;
`;

const ImageItem = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default ViewSection;
