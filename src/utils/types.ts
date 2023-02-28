export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type TConstructorIngredient = {
    ingredient: TIngredient;
    key: string;
}

export type TUser = {
    email: string;
    name: string;
}

export type TResponse = {
    payload: { 
        success: boolean;
        refreshToken?: string; 
    }; 
}