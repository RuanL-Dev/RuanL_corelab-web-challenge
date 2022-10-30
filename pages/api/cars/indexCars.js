import createHandler from '../../../lib/middlewares/nextConnect'
import validate from '../../../lib/middlewares/validation'
import { addNewCarUser, deleteCar, getCars, editCar } from '../../../modules/cars/car.service'
import { newcarSchema, deleteCarSchema, editCarSchema } from '../../../modules/cars/car.schema'

const indexCars = createHandler()

indexCars
  .post(validate({ body: newcarSchema }), async (req, res) => {
    try {
      const newCar = await addNewCarUser(req.body)
      res.status(201).json(newCar)
    } catch (err) {
      return res.status(400).send(err.message)
    }
  })
  .delete(validate(deleteCarSchema), async (req, res) => {
    try {
      const deletedCar = await deleteCar(req.body.id)
      if (deletedCar) return res.status(200).send({ ok: true })
      return res.status(400).send('anúncio já deletado')
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })
  .get(async (req, res) => {
    try {
      const filter = await getCars()
      res.status(200).send(filter)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })
  .patch(validate(editCarSchema), async (req, res) => {
    try {
      const refreshEditCar = await editCar(req.body)
      if (refreshEditCar) res.status(201).send({ ok: true })
      return res.status(400).send(res.message)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

export default indexCars
