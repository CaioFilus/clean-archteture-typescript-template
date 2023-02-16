
export interface ServiceTravel {
    id: number,
    tons: number,
    travelPrice: number,
    cooperative: {
        name: string,
    },
    truck: {
        plate: string,
        cartPlate: string,
    }
    travelDate?: Date,
}

export default interface Service {
    id: number,
    name: string,
    material: string,
    paymentNoteId: number,
    travels: ServiceTravel[]
}
