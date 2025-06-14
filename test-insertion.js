// Test file to verify the insertion logic
// This simulates the findInsertionIndex function

function findInsertionIndex(items, newPrice) {
  // Binary search for optimal O(log n) performance
  let left = 0;
  let right = items.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (items[mid].price >= newPrice) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}

// Test data (sorted in descending order by price)
const testItems = [
  { name: "工资", price: 5000 },
  { name: "兼职收入", price: 1200 },
  { name: "购物", price: -500 },
  { name: "房租", price: -2000 }
];

console.log("Original items (descending order):");
testItems.forEach((item, index) => {
  console.log(`${index}: ${item.name} - ${item.price}`);
});

// Test cases
const testCases = [
  { name: "高收入", price: 6000 },    // Should be inserted at index 0
  { name: "中等收入", price: 3000 },  // Should be inserted at index 1
  { name: "小支出", price: -100 },    // Should be inserted at index 3
  { name: "大支出", price: -3000 }    // Should be inserted at index 4 (end)
];

console.log("\nTesting insertion logic:");
testCases.forEach(newItem => {
  const insertIndex = findInsertionIndex(testItems, newItem.price);
  console.log(`${newItem.name} (${newItem.price}) should be inserted at index ${insertIndex}`);
  
  // Simulate insertion
  const newItems = [...testItems];
  newItems.splice(insertIndex, 0, newItem);
  
  console.log("After insertion:");
  newItems.forEach((item, index) => {
    const marker = item === newItem ? " <-- NEW" : "";
    console.log(`  ${index}: ${item.name} - ${item.price}${marker}`);
  });
  
  // Verify order is still descending
  let isDescending = true;
  for (let i = 1; i < newItems.length; i++) {
    if (newItems[i-1].price < newItems[i].price) {
      isDescending = false;
      break;
    }
  }
  console.log(`Order is ${isDescending ? "correct" : "INCORRECT"}!\n`);
});
