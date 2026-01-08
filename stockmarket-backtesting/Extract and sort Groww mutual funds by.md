# Extract and sort Groww mutual funds by XIRR

```javascript
// Extract all mutual fund data from the page and sort by XIRR
const funds = [];
const rows = document.querySelectorAll('table tbody tr');

rows.forEach(row => {
  const nameCell = row.querySelector('td:first-child');
  const xiirrText = nameCell.textContent;
  
  // Extract XIRR value using regex
  const xiirrMatch = xiirrText.match(/XIRR\s*\(([^)]+)\)/);
  
  if(xiirrMatch) {
    // Get fund name from link or text
    const fundName = nameCell.querySelector('a') 
      ? nameCell.querySelector('a').textContent 
      : xiirrText.split('XIRR')[0].trim();
    
    // Parse XIRR as float
    const xiirr = parseFloat(xiirrMatch[1]);
    
    funds.push({
      name: fundName,
      xiirr: xiirr,
      text: xiirrText
    });
  }
});

// Sort by XIRR in descending order (highest to lowest)
funds.sort((a, b) => b.xiirr - a.xiirr);

// Display results
console.table(funds);
```

## How it works

1. **Selects all table rows** - `document.querySelectorAll('table tbody tr')` gets every fund row
2. **Extracts XIRR text** - Reads the first cell containing fund name and XIRR
3. **Uses regex to parse XIRR** - `/XIRR\s*\(([^)]+)\)/` captures the percentage value inside parentheses
4. **Creates fund objects** - Stores name and numeric XIRR value
5. **Sorts descending** - `b.xiirr - a.xiirr` sorts from highest (63.80%) to lowest (-19.70%)
6. **Outputs to console** - `console.table()` displays formatted results

## To use this on the Groww page

1. Press `F12` to open Developer Tools
2. Go to the Console tab
3. Paste the entire code above
4. Press Enter
5. The sorted list will appear in a table format in the console

The code extracts all 45 funds and displays them ranked by XIRR performance.