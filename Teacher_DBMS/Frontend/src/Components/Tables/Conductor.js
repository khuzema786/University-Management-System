import React from 'react';

import Table from './Table';

import { tableName } from '../../Data/infographics.json';

// ['st]dent', 'courses', ...

function Conductor({ category }) {
  // 1
  // tableName[0] = 'student'
  return <Table table={tableName[category - 1]} />;
}

export default Conductor;
