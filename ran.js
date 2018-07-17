
  
  // app.js
  
  
  
  con.query('SELECT * FROM employees', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:\n');
    console.log(rows);
    
    rows.forEach( (row) => {
    console.log(`${row.ename} is in ${row.location}`);
  });
  
  });
  
  const employee = { ename: 'Winnie', location: 'Australia' };
  con.query('INSERT INTO employees SET ?', employee, (err, res) => {
    if(err) throw err;
  
    console.log('Last insert ID:', res.insertId);
  });
    
  
  
  
  
  
  con.end((err) => {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });
  