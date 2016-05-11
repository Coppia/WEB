'use strict';

import mongoose from 'mongoose';

var NoteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Note', NoteSchema);
