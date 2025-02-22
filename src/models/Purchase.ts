import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['접수중', '처리완료'],
    default: '접수중'
  }
}, {
  timestamps: true
});

export default mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);