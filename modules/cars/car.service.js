import NewCar from './car.model'

export const addNewCarUser = async (body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCar = { ...body }
    const dbNewcar = await NewCar.create(newCar)
    return dbNewcar
  } catch (err) {
    throw err
  }
}

export const getCars = async (limit = 20) => {
  return await NewCar.find().sort({ carYear: -1 }).limit(limit)
}

export const deleteCar = async (id) => {
  return await NewCar.findOneAndDelete({
    _id: id
  })
}

export const editCar = async (body) => {
  return await NewCar.findOneAndUpdate(
    {
      _id: body._id
    },
    {
      carModel: body.carModel,
      carBrand: body.carBrand,
      carColor: body.carColor,
      carPlate: body.carPlate,
      carPrice: body.carPrice,
      carDescription: body.carDescription,
      carYear: body.carYear,
      isLiked: body.isLiked
    },
    {
      new: true
    }
  )
}
