'use strict';

import mongoose from 'mongoose';

var IdeaSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Idea', IdeaSchema);
