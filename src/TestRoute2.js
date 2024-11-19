import { useParams } from "react-router-dom";

export function TestRoute2() {
  const { aa } = useParams;
  return <>"테스트용 라우터2"</>;
}
