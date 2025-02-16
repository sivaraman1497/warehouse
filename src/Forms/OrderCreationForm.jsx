import React, { useEffect, useState } from 'react'

function OrderCreationForm() {

    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    
    useEffect(() => {
        const url = 'http://localhost:5000/getCategories'
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(categoriesData => setCategories(categoriesData))
    }, [])

    useEffect(() => {
        const url = 'http://localhost:5000/getItems'
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(itemsData => setItems(itemsData))
    }, [])

  return (
    <>
        <div className="container text-center mt-5">
            <form method="POST">
                    <div className='col'>
                        <select className='form-control w-25'>
                            <option>Select a category</option>
                            {
                                categories.map((category) => {
                                    return <option key={category.id}>{category.name}</option>
                                })
                            }
                        </select>
                    </div> 

                    <div className='col'>
                       <select className='form-control w-25'>
                            <option>Select a product</option>
                            {
                                items.map((item) => {
                                    return <option key={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div> 

                    <div className='col'>
                        <input type="number" className='form-control w-25' id="quantity" name="quantity"/>
                    </div> 

                    <div className='col'>
                        <input type="text" className='form-control w-25' id="branch" name="branch" disabled/>
                    </div> 
            </form>
        </div>
    </>
  )
}

export default OrderCreationForm