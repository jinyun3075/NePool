import React from "react";
import HeaderSignin from "../header/header";
import PostNav from "../home/postNav";
import MorePost from "./morePost";
import PostBtn from "./postButton";

export default function AllPost() {
  return (
    <>
      <HeaderSignin />
      <PostNav />
      <MorePost />
      <PostBtn />
    </>
  );
}

