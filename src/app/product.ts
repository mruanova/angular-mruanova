export class Product {
    
    constructor(
        public id: number = Math.floor(Math.random() * 9999) + 1,
        public title: string = '',
        public price: number = 0,
        public imgUrl: string = null
    ) {};

};
