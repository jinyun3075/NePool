import { useLocation } from "react-router-dom";
import UpdateQuestion from "../components/updatequestion/UpdateQuetion";

export default function UpdateWork() {
  const location = useLocation();
  const workbookid = location.state.workbookid;

  return (
    <>
      <UpdateQuestion workbookid={workbookid} />
    </>
  );
}
