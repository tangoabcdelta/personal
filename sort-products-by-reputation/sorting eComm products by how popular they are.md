# Sorting eComm Products by how popular they are

## The request

"Provide a **JavaScript snippet** to extract product metadata—including URL, name, price, and star rating—from the DOM. The data should be **sorted by review count** in descending order and displayed in the console using **`console.table()`** for structured visualization."

## The Result

Paste this into DevTools console on that listing page and run; it will traverse, sort by review count desc, and log a table. [flipkart](https://www.flipkart.com/automotive-accessories/vehicle-cleaners/vehicle-vacuum-cleaners/pr?sid=1mt%2Cs84%2Catb&marketplace=FLIPKART&sort=popularity)

```js
// Flipkart car vacuum cleaners listing traversal
(() => {
    //   .....
    // Filter out obvious garbage
    if (!name || !url) return;

    // read the updated code in the adjacent js file

    products.push({
      name,
      rating,
      reviewCount,
      price,
      priceText,
      url
    });
  });

  // Sort by review count desc (nulls last)
  products.sort((a, b) => {
    if (a.reviewCount == null && b.reviewCount == null) return 0;
    if (a.reviewCount == null) return 1;
    if (b.reviewCount == null) return -1;
    return b.reviewCount - a.reviewCount;
  });

  console.table(products);
  console.log('Total products:', products.length);
})();
```

If Flipkart’s DOM team wakes up tomorrow and renames all the classes, ping me and we’ll bully it into working again. [flipkart](https://www.flipkart.com/automotive-accessories/vehicle-cleaners/vehicle-vacuum-cleaners/pr?sid=1mt%2Cs84%2Catb&marketplace=FLIPKART&sort=popularity)