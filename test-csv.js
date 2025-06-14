// Test CSV conversion functionality

// Mock data
const testItems = [
  { name: "工资", price: 5000 },
  { name: "兼职收入", price: 1200 },
  { name: "购物", price: -500 },
  { name: "房租", price: -2000 }
];

// CSV conversion function (same as in the component)
function convertToCSV(selectedIndexes, items) {
  const headers = ["名称", "金额"];
  const csvRows = [headers.join(",")];
  
  selectedIndexes.forEach(index => {
    const item = items[index];
    if (item) {
      const row = [
        `"${item.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
        item.price.toString()
      ];
      csvRows.push(row.join(","));
    }
  });
  
  return csvRows.join("\n");
}

// Test cases
console.log("Testing CSV conversion:");
console.log("=".repeat(50));

// Test 1: Select first two items
const selectedSet1 = new Set([0, 1]);
const csv1 = convertToCSV(selectedSet1, testItems);
console.log("Test 1 - Select first two items:");
console.log(csv1);
console.log();

// Test 2: Select all items
const selectedSet2 = new Set([0, 1, 2, 3]);
const csv2 = convertToCSV(selectedSet2, testItems);
console.log("Test 2 - Select all items:");
console.log(csv2);
console.log();

// Test 3: Select items with special characters
const testItemsSpecial = [
  { name: 'Item with "quotes"', price: 100 },
  { name: 'Item, with comma', price: -50 }
];
const selectedSet3 = new Set([0, 1]);
const csv3 = convertToCSV(selectedSet3, testItemsSpecial);
console.log("Test 3 - Items with special characters:");
console.log(csv3);
console.log();

console.log("All tests completed!");
