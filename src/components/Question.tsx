import { Component, ReactElement, ReactNode } from "react";
import { TQuestion } from "../domain/Question";

type TObjQuestion = {
   question : TQuestion
}

export function Question(objQuestion : TObjQuestion){
   return(
      <div>{objQuestion.question.content}</div>
   );
}