import { useParams } from "react-router-dom";

export function TestRoute1() {
  const { aa } = useParams;
  return <>테스트용 라우터1</>;
}
