import {Transaction} from './transaction';
export class Image {
    constructor(
               public attributes:Attributes,
               public transaction:Transaction) { }
 
}
export class Attributes{
     constructor(
                public lips: string, 
                public asian: number, 
                public gender: Gender,
                public age: number, 
                public hispanic: number, 
                public other: number,
                public black: number,
                public white: number,
                public glasses: string) { }
 
}
export class Gender{
     constructor(
               public type:string) { }    
}
 