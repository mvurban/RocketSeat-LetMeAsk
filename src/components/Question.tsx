import { TQuestion } from "../domain/Question";
import "../styles/questionComponent.scss";

type TObjQuestion = {
   question : TQuestion
}

export function Question(objQuestion : TObjQuestion){

   // objQuestion.questions.map((obj, index)=>{
   //    console.log(index+1 + " - " + obj.content);      
   // });

   const question = objQuestion.question;

   return(
      <div className="question-container">
         <span>{question.content}</span>

         <div className="question-footer">
            
            <div className="question-author">
               <img src={question.author.avatar} alt={question.author.name}></img>
               <span>{question.author.name}</span>
            </div>

            <div className="question-like">
               <span>6</span>
               <button>
                  <img></img>
               </button>               
            </div>

         </div>
      </div>
   );
}