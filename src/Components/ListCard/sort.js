
export function sort(currentFilter, data) {
    let sortedArray = data

  if (currentFilter === "popular") {
    for (const item of sortedArray) {
      item.numberOfLikes = item.likes.length;
    }
    sortedArray = sortedArray.sort((a, b) => a.numberOfLikes - b.numberOfLikes).reverse();
  }

  if (currentFilter === "new") {
    sortedArray = sortedArray.filter((item) => item.tags.includes("new"));
  }
  if (currentFilter === "cheap") {
    sortedArray = sortedArray.sort((a, b) => a.price - b.price);
  }
  if (currentFilter === "expensive") {
    sortedArray = sortedArray.sort((a, b) => a.price - b.price).reverse();
  }
  if (currentFilter === "sale") {
    sortedArray = sortedArray.filter((item) => item.discount > 0);
  }
  if (currentFilter === "rating") {
    let newArray = [];
    let result = 0;
    for (const item of sortedArray) {
      for (const item2 of item.reviews) {
        newArray.push(item2.rating);
      }
      if (newArray.length > 0) {
        result = newArray.reduce((a, b) => a + b, 0) / newArray.length;
      }
      item.averageRating = result.toFixed(1);
      result = 0;
      newArray = [];
    }
    sortedArray = sortedArray
      .sort((a, b) => a.averageRating - b.averageRating)
      .reverse();
  }
    return sortedArray
}

