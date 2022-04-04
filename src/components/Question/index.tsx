import { TQuestion } from "../../domain/Question";
import { Children, ReactNode } from "react";
import "./styles.scss";

type TObjQuestion = {
   question : TQuestion;
   children? : ReactNode;
}

export function Question(props : TObjQuestion){

   // objQuestion.questions.map((obj, index)=>{
   //    console.log(index+1 + " - " + obj.content);      
   // });

   const question = props.question;

   //console.log("question",question);   

   return(
      <div className="question-container">
         <p>{question.content}</p>

         <footer>
            
            <div className="question-author">
               <img 
                  src={question.author.avatar} 
                  referrerPolicy="no-referrer"
                  alt={question.author.name}></img> 
               <span>{question.author.name}</span>
            </div>

            <div className="question-cmds">
               {props.children}          
            </div>

         </footer>
      </div>

      
   );
}