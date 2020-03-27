export class OrderData {
    id: number;
    quantity: number;
    item_name: string;
    emailid: string;
    item_price: number;
    price_per_item:number;
    total_Price: number;
    order: string;
}

export class CheckOut {
    id: number;
    email: string;
    order: string;
}