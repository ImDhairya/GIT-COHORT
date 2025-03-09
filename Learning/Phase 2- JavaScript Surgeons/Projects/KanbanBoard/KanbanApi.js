export default class KanbanAPI {
  //The static keyword in JavaScript is used to define methods and properties that belong to a class itself, rather than to instances (objects) of that class

  //Static Members:
  // Static members (methods or properties) are associated with the class itself.
  // They are accessed using the class name, not an instance of the class.
  // They are useful for utility functions, constants, or data shared among all instances

  static getItems(columnId) {
    // i found the values from the read and then returned it.
    const column = read().find((column) => column.id === columnId);

    if (!column) {
      return [];
    }

    return column.items;
  }

  static insertItme(columnId, content) {
    // understanding this is important here we are passing the reference to the object which is given
    // when we use the assign '=' operator
    const data = read();
    const column = data.find((col) => col.id === columnId);
    const item = {
      id: Math.floor(Math.random() * 123234324534534),
      content,
    };

    if (!column) {
      throw new Error("Column does not exists ");
    }

    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newProps) {
    const data = read();

    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id === itemId);
        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error("Item not found");
    }

    item.content =
      newProps.content === undefined ? item.content : newProps.content;

    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find((col) => col.id === newProps.columnId);

      if (!targetColumn) {
        throw new Error("Target column not found");
      }
      // Delete the item from its current column
      currentColumn.items.splice(currentColumn.item.indexOf(item), 1);

      // moveitem into its new column and positioon
      targetColumn.items.splice(newProps.position, 0, item);
    }

    save(data);
  }

  static deleteItem(itemId) {
    const data = read();

    for (const column of data) {
      const item = column.item.find((item) => item.id == itemId);

      if (item) {
        column.items.splice(column.items, indexOf(item), 1);
      }
    }

    save(data);
  }
}

function read() {
  const json = localStorage.getItem("kanban-data");

  // when the user is for the first time using the kanban board
  if (!json) {
    return [
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      },
    ];
  }

  return JSON.parse(json);
}

function save(data) {
  // data is going to be the thing that the read funciton returns
  localStorage.setItem("kanban-data", JSON.stringify(data));
}

// const people = [
//   {id: 1, name: "Alice"},
//   {id: 2, name: "Bob"},
//   {id: 3, name: "Charlie"},
// ];

// const foundPerson = people.find((ele) => ele.id === my_id)

// prototype.myFind = function (fn) {
//   let returnArr = [];
//   console.log(this);
//   for (let i = 0; i < this.length; i++) {
//     if (fn(this[i])) {
//       return this[i];
//     }
//   }
// };

[
  {
    content: "Edit video hehe",
    id: 8988,
  },
];
