import { useLocation } from 'react-router-dom';
import HeaderSignin from "../header/header";
import Background from "./background";

export default function Add() {
  const location = useLocation()
  const workbookid = location.state.workbookid
    return (
      <>
      <HeaderSignin />
      <Background workbookid = {workbookid}/>
      </>
    )
  }
