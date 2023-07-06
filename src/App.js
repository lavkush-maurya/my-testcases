import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [counter, setCounter] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const Bstyle = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "7px",
    margin: "10px",
  };
  const handleCounterClick = (value) => {
    setCounter((counter) => counter + value);
  };

  const handleNewItemChange = (e) => {
    setNewItemText(e.target.value);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setListItems([
      ...listItems,
      {
        text: newItemText,
        id: listItems.length,
      },
    ]);
    setNewItemText("");
  };

  const handleRemoveItem = (id) => {
    const newListItems = listItems.filter((item) => item.id !== id);
    setListItems(newListItems);
  };

  const listItemComponents = listItems.map((item) => {
    return (
      <Flex
        justifyContent={"space-between"}
        data-testid={`item${item.id}`}
        key={item.id}
      >
        <div>{item.text}</div>
        <div>
          <Button
            size="lg"
            colorScheme="teal"
            variant="outline"
            data-testid={`remove-item${item.id}`}
            onClick={() => handleRemoveItem(item.id)}
          >
            Remove
          </Button>
        </div>
      </Flex>
    );
  });
  return (
    <ChakraProvider>
      <Flex justifyContent={"center"} marginTop={"10%"}>
        <div className="App">
          <header className="App-header">
            <p>
              Counter:
              <span data-testid="counter-value">{counter}</span>
            </p>
            <div>
              <button
                style={Bstyle}
                colorScheme="teal"
                variant="outline"
                onClick={() => handleCounterClick(1)}
              >
                Increment
              </button>
              <button
                style={Bstyle}
                colorScheme="teal"
                variant="outline"
                onClick={() => handleCounterClick(-1)}
                disabled={counter <= 0}
              >
                Decrement
              </button>
            </div>
            <br />
            <form onSubmit={handleAddItem}>
              <label htmlFor="newItem">
                Create List Item
                <Input
                  htmlSize={6}
                  width="auto"
                  variant="filled"
                  id="newItem"
                  value={newItemText}
                  onChange={handleNewItemChange}
                />
              </label>
              <Button
                colorScheme="teal"
                variant="outline"
                data-testid="add-item"
                type="submit"
              >
                Add Item
              </Button>
            </form>
            <ul>{listItemComponents}</ul>
          </header>
        </div>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
