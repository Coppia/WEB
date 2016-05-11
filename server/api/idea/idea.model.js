'use strict';

import mongoose from 'mongoose';

var IdeaSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Idea', IdeaSchema);
