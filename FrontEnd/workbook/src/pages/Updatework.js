import { useLocation } from "react-router-dom";
import UpdateQuestion from "../components/updatequestion/UpdateQuestion";

export default function UpdateWork() {
  const location = useLocation();
  const workbookid = location.state.workbookid;

  return (
    <>
      <UpdateQuestion workbookid={workbookid} />
    </>
  );
}
