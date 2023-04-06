import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  function addNewItem(newItem) {
    const updatedItems = [
      ...items,
      newItem,
    ]
    setItems(updatedItems)
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => item.id !== updatedItem.id ? item : updatedItem)
    setItems(updatedItems)
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleDelete(deletedItem) {
    const updatedItems = items.filter(item => item.id === deletedItem.id ? false : true)
    setItems(updatedItems)
    }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addNewItem={addNewItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleUpdateItem={handleUpdateItem} onDeleteItem={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
