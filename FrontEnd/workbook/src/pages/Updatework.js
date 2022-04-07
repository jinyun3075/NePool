import { useLocation } from 'react-router-dom';
import UpdateQuestion from "../components/updatequestion/updatequetion";

export default function UpdateWork() {
  const location = useLocation()
  const workbookid = location.state.workbookid;
  const workid = location.state.workid;
  console.log(workbookid)
  console.log(workid)
  
  return (  
    <>
      <UpdateQuestion workbookid={workbookid} workid={workid}/> 
    </>
    )
}
