import mongoose from 'mongoose'

const NewCarSchema = new mongoose.Schema({
  carModel: { type: String, required: true, uppercase: true, maxlength: 30 },
  carBrand: { type: String, required: true, uppercase: true, maxlength: 20 },
  carColor: { type: String, required: true, maxlength: 30 },
  carDescription: { type: String, required: true, uppercase: true, maxlength: 70 },
  carYear: { type: String, required: true, maxlength: 4, minlength: 4 },
  carPlate: { type: String, required: true, maxlength: 15 },
  carPrice: { type: String, required: true, maxlength: 15 },
  isLiked: { type: Boolean }
})

export default mongoose.models.NewCar || mongoose.model('NewCar', NewCarSchema)
