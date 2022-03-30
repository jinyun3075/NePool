import React from "react";
import HeaderSignin from "../header/header";
import AllPostNav from "./allPostNav";
import MorePost from "./morePost";

export default function AllPost() {
  return (
    <>
      <HeaderSignin />
      <AllPostNav />
      <MorePost />
      {/* <PostBtn /> */}
    </>
  );
}

