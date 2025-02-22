import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  userId: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      userId: { type: String, required: true },  
    },
    { timestamps: { createdAt: 'createdAt' } }
  );
  

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
export default Post;
