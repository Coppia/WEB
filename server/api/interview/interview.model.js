'use strict';

import mongoose from 'mongoose';

var InterviewSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Interview', InterviewSchema);
