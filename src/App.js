import './App.css';
import { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';


const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if (list){
    return JSON.parse(localStorage.getItem('list'))
  }
  return [];
}

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [alert, setAlert] = useState(
    {
      show : false, 
      msg : '', 
      type : ''
    });

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted.......');

      if (!name){
        showAlert(true, 'Please Enter Value', 'danger',);
      }

      else if (name && isEdit) {
        setList(
          list.map(item => {
            if (item.id === id){
              return {...item, title: name}
            }
            return item; 
          })
        )
        setName('');
        setId(null);
        showAlert(true, 'Value Changed', 'success');
        setIsEdit(false);
        
      }
      else {
        showAlert(true, 'item added to the list', 'success')
        const newItems = {id : new Date().getTime().toString(), title : name};
        setList([...list, newItems]);
        setName('');
      }
  }
  
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'Empty List', 'danger');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'Item Removed', 'danger');
    setList(list.filter(item => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find(item => item.id === id);
    setIsEdit(true);
    setId(id);
    setName(specificItem.title)
  }

  useEffect(()=>{
      localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  return (
    <section className='grocery-container'>

      {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h2 className='heading'> Grocery List </h2>

      <form onSubmit={handleSubmit}>

        <input className='input-text' type="text" placeholder='e.g: eggs' 
        onChange={(e)=> setName(e.target.value)} 
        value = {name} 
        />

        <button className='submit-btn'>  
          {isEdit ? 'Edit' : 'Submit'}
        </button>

      </form>

      {list.length > 0 && 
          <div className='list-container'>
              <List items = {list} removeItem = {removeItem} editItem = {editItem}/>
              <button onClick={clearList} className='clear-btn'>Clear Items </button>
          </div>
      }
      
    </section>
  );
}

export default App;
