import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({items, removeItem, editItem}) => {
    return (
        <div>
          {
              items.map(item => {
                  const {id, title} = item;
        
                  return (
                    <article key = {id} className='grocery-items'> 
                    <p>{title}</p>
                    <div className='button-container'>
                      <button onClick={()=> editItem(id)} className='edit-btn'> <FaEdit/> </button>
                      <button onClick={()=> removeItem(id)} className='del-btn'> <FaTrash/> </button>
                    </div>
                    
                  </article>
                )
              })
          }  
        </div>
    );
};

export default List;