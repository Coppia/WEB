'use strict';

import mongoose from 'mongoose';

var NoteSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Note', NoteSchema);
