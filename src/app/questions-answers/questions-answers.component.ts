import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})
export class QuestionsAnswersComponent implements OnInit {
vermais: boolean = false;
maisResposta: boolean = false;
public showMaisRespostas = 3;
public showTotalRespostas = 0;  


  constructor() { }

  ngOnInit(): void {
  }
  getMais(num){
   // this.vermais = true;
   var formElement = <HTMLFormElement>document.getElementById('mais'+num);
   formElement.style.display='block';
    this.maisResposta = false;
  }
  
  getMinus(idp){
    var formElement = <HTMLFormElement>document.getElementById('mais'+idp);
    formElement.style.display='none';
    var scrollPos = $("#card"+idp).offset().top;
   $("body,html").animate({scrollTop: scrollPos}, "slow");
    
  }
  getMore(respostas){
    
  }
}
