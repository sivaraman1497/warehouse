import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function OrderCreationForm() {

    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [items, setItems] = useState([])
    const [nos, setNos] = useState({old:0, new:0})

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
        const url = `http://localhost:5000/getCategoryItems/${categoryId}`;

        categoryId && fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => setItems(data.results))
        .catch(err => console.log(err))

    }, [categoryId])

    function handleCategoryChange(e)
    {
        let categoryId = e.target.value;
        setCategoryId(categoryId);
        setNos((prev) => ({...prev, old: 0}))
    }

    function handleItemChange(e)
    {
        items.find((item) => (item.id === parseInt(e.target.value)) && setNos((prev) => ({...prev, old: item.nos})))
        setNos((prev) => ({...prev, new: 0}))
    }

    function handleNosChange(e)
    {
        if(e.target.value <= nos.old && e.target.value > 0)
        {
            setNos((prev) => ({...prev, new: e.target.value}))
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
    }

  return (
    <>
        <Link to="/my" className="btn btn-secondary">Back</Link>
        <div className="container text-center mt-5 w-25" onSubmit={(e) => handleSubmit(e)}>
            <form method="POST">
                <div className='col mt-4'>
                    <label htmlFor="category">Category</label>
                    <select className='form-control mt-2' id="category" onChange={(e) => handleCategoryChange(e)}>
                        <option>Select a category</option>
                        {
                            categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>
                </div> 

                <div className='col mt-4'>
                    <label htmlFor="item">Item name</label>
                    <select className='form-control mt-2' id="item" onChange={(e) => handleItemChange(e)}>
                        <option>Select a product</option>
                        {
                            items.map((item) => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div> 

                <div className='col mt-4'>
                    <label htmlFor="quantity">Quantity {`(${nos.old})` || `(nos)`}</label>
                    <input type="number" className='form-control mt-2' id="quantity" name="quantity" value={nos.new || 0} onChange={(e) => handleNosChange(e)}/>
                </div> 

                <div className='col mt-4'>
                    <label htmlFor="branch">Branch</label>
                    <input type="text" className='form-control mt-2' id="branch" name="branch"/>
                </div> 

                <div className='col mt-4'>
                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </div>
                
            </form>
        </div>
    </>
  )
}

export default OrderCreationForm