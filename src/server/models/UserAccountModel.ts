import { Document, model, Schema } from 'mongoose'
import { UserAccount } from 'types/UserAccount'

interface UserAccountModel extends UserAccount, Document {}

const schema: Schema = new Schema(
  {
    username: { type: String },
    email: { type: String, match: /.+@.+\..+/ },
    addresses: { type: [String] },
    disabled: { type: Boolean, required: false, default: false },
    pushSubscription: 'Mixed'
  },
  { timestamps: true }
)

let mongooseModel
try {
  mongooseModel = model<UserAccountModel>('UserAccount')
} catch (e) {
  mongooseModel = model<UserAccountModel>('UserAccount', schema)
}

export default mongooseModel
