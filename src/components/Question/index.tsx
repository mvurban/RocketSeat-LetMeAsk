import { TQuestion } from "../../domain/Question";
import "./styles.scss";

type TObjQuestion = {
   question : TQuestion
}

export function Question(props : TObjQuestion){

   // objQuestion.questions.map((obj, index)=>{
   //    console.log(index+1 + " - " + obj.content);      
   // });

   const question = props.question;

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

            <div className="question-like">
               <span>6</span>
               <button>
                  <img></img>
               </button>               
            </div>

         </footer>
      </div>

      
   );
}