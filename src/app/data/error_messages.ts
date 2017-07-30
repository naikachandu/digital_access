export class ErrorMessage {
    constructor(              
               public err:Error[]
               ) { }
 
}
export class Error{
    constructor(
        public message:string,
        public errCode:number,
    ){}
}
