import { create } from "zustand"; // 기본 내보내기가 아닌 이름 기반 가져오기

interface Store {
    processId: string[];
    setProcessId: (idx: number, id: string) => void;
}

const useStore = create<Store>((set) => ({
    processId: ['', '', '', ''], // 초기 배열 상태
    setProcessId: (idx, id) =>
        set((state) => ({
            processId: state.processId.map((item, index) =>
                index === idx ? id : item // 인덱스에 해당하는 값만 업데이트
            ),
        })),
}));

export default useStore;
