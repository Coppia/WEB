'use strict';

import mongoose from 'mongoose';

var InterviewSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean
});

export default mongoose.model('Interview', InterviewSchema);
