export class Transaction {
    constructor(
        public status: string,
        public topLeftX: number,
        public topLeftY: number,
        public gallery_name: string,
        public timestamp: string,
        public height: number,
        public quality: number,
        public confidence: number,
        public subject_id: string,
        public width: number,
        public face_id: number) { }
 
}