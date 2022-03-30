import { TQuestion } from "../domain/Question";

type TObjQuestion = {
   questions : TQuestion[]
}

export function Question(objQuestion : TObjQuestion){

   objQuestion.questions.map((obj, index)=>{
      console.log(index+1 + " - " + obj.content);      
   });

   return(
      <div>
         <div>{objQuestion.questions.length}</div>
         <div>
         {
            objQuestion.questions.map(({author, content})=>{
               return <div>{content}</div>
            })
            //objQuestion.questions[0].content
         }
         </div>
      </div>
   );
}