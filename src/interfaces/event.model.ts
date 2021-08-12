interface Event{
    id: string | number,
    name: string,
    startDate: Date,
    endDate: Date,
    price: number,
    status: string,
    createdOn: Date
}

export{
    Event,
}