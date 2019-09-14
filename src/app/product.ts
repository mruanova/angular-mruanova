export class Product {
    
    constructor(
        public id: number = Math.floor(Math.random() * 9999) + 1,
        public title: string = '',
        public position: string = '',
        public imgUrl: string = null
    ) {};

};
