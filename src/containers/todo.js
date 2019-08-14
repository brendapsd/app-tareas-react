import React from 'react';
import TodoPage from '../pages/todo'; 
import {create, read, update, remove} from '../services/api'


class Todo extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      error: '',
      items: [],
      newItemText: ''
    };

    this.onNewItem = this.onNewItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onChangeNewItemText = this.onChangeNewItemText.bind(this); 
    this.onExitEditMode = this.onExitEditMode.bind(this); 
    this.onEnterEditMode = this.onEnterEditMode.bind(this);
    this.onToggleItemComplete = this.onToggleItemComplete.bind(this);
  }

  async componentDidMount() {
    try {
      const items = await read(); 

      this.setState({ items }); 
    } catch (error) {
      this.setState({error: error.message}); 
    }
  }

  async onNewItem() {
    try {
      const newItem = await create({ text: '', isChecked: false});

      this.setState({
        items: [
          ...this.state.items,
          {
            ...newItem,
            isEditting: true,
          },
        ],
      })
    } catch (error) {
      this.setState({error: error.message}); 
    } 
  } 

  async onRemoveItem(item) {
    try {
      await remove(item.id); 

      const { items } = this.state;

      const index = items.findIndex(n => n.id === item.id);

      if(index === -1){
        return;
      }

      const newItems = items.slice();
      console.log(newItems)
      newItems.splice(index, 1); 

      this.setState({ items: newItems }); 
    } catch (error) {
      this.setState({error: error.message}); 
    }
  }

  onChangeNewItemText(event) {
    this.setState({ newItemText: event.target.value }); 
  }

  async onExitEditMode(item) {
    try {

      const {
        items,
        newItemText,
      } = this.state;

      const updateItem = await update(item.id, { text: newItemText}); 

      this.setState({
        newItemText: '',
        items: items.map((next) => {
          if (next.id === item.id) {
            return {
              ...updateItem,
              isEditting: false,
            };
          }
          return next; 
        })
      });
    } catch (error) {
      this.setState({error: error.message}); 
    } 
  }

  onEnterEditMode(item){
    const {
      items,
    } = this.state;

    this.setState({
      newItemText: item.text,
      items: items.map((next) => {
        if (next.id === item.id) {
          return {
            ...next,
            isEditting: true,
          };
        }
        return next; 
      })
    })
  }

  async onToggleItemComplete(item) {
    try {
      const updateItem = await update(item.id, { isChecked: !item.isChecked }); 

      const {
        items,
      } = this.state;

      this.setState({
        items: items.map((next) => {
          if (next.id === item.id) {
            return updateItem
          }
          return next; 
        })
      })
    } catch (error) {
      this.setState({error: error.message}); 
    }
  }

  render(){
    const {
      items,
      newItemText,
      error
    } = this.state; 

    return (
      <TodoPage
        items={items}
        onNewItem={this.onNewItem}
        onRemoveItem={this.onRemoveItem}
        onChangeNewItemText={this.onChangeNewItemText}
        newItemText={newItemText}
        onExitEditMode={this.onExitEditMode}
        onEnterEditMode={this.onEnterEditMode}
        onToggleItemComplete={this.onToggleItemComplete}
        error={error}
      />
    ); 
  }
}

export default Todo; 