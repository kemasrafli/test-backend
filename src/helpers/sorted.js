function generateSorted(rows, columns) {
    const result = [];
    const queue = [];
  
    // Populate the queue with the initial values
    for (let i = 1; i <= rows; i++) {
      queue.push(i);
    }
  
    // Iterate through rows
    for (let i = 1; i <= rows; i++) {
      const rowValues = [];
  
      // Sort the queue in ascending order
      queue.sort((a, b) => a - b);
  
      // Iterate through columns
      for (let j = 1; j <= columns; j++) {
        const value = queue.shift(); // Dequeue the front element
        rowValues.push(value * j);
      }
  
      result.push(rowValues);
  
      // Enqueue the next multiple for the next row
      queue.push(i + 1);
    }
  
    return result;
}
  
module.exports = generateSorted;