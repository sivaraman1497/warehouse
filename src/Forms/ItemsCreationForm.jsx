import React, {useState, useEffect} from 'react';
import { FaRegEdit, FaRegTrashAlt} from 'react-icons/fa'; // Font Awesome icons
import {useNavigate} from 'react-router-dom'

function ItemsCreationForm()
{
    const [data, setData] = useState({name:'', nos:'', id:'', category: ''});
    const [dataDB, setDataDB] = useState([]);
    const [err, setErr] = useState('');
    const [fetchData, setFetchData] = useState(false);
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5000/getCategories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => res.json())
        .then((resdata) => {setCategories(resdata)})
        .catch((err) => console.log(err)) 
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/getItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => res.json())
        .then((resdata) => {setDataDB(resdata)})
        .catch((err) => console.log(err)) 
    }, [fetchData])  

    function fetchFn(url, params, method)
    {
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((data) => (data === 'success'))
        .catch((err) => console.log(err))
    }

    function handleEdit(idVal, nameVal, nosVal, categoryVal)
    {
       setData(() => ({id: idVal, name: nameVal, nos: nosVal, category: categoryVal}))
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        let url = '';
        
        if(data.name && data.nos && data.id === '')
        {
            url = 'http://localhost:5000/itemCreate';
            fetchFn(url, {name: data.name, nos: data.nos, id: '', category: data.category}, 'POST')
        }

        else
        {
            url = `http://localhost:5000/itemEdit/${data.id}`;
            fetchFn(url, {name: data.name, nos: data.nos, category: data.category}, 'POST')
        }

        setData({name:'', nos:'', id:'', category:''});
        setFetchData(!fetchData)
    }

    function handleDelete(idVal)
    {
        let url = `http://localhost:5000/deleteItem/${idVal}`;

        fetchFn(url, {id:idVal}, 'DELETE')
        setFetchData(!fetchData)
    }

    function handleBack()
    {
        navigate(-1)   
    }

    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>

            <div className='container w-50 m-auto text-center mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className="row">

                        <div className='col-3'>
                            <label htmlFor='category' className='m-auto w-100 text-start mb-2'>Category</label>
                            <select className='form-control' onChange={(e) => setData((prev) => ({...prev, category: e.target.value}))} value={data.category}>
                                <option key={''} value={''}>Select a category</option>
                                {
                                    categories.map((category, index) => {
                                       return (
                                            <option key={category.id || index} value={category.id}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='col-3'>
                            <label htmlFor="iteminput" className='m-auto w-100 text-start mb-2'>Item Name</label>
                            <input type='text' name='iteminput' id='iteminput' className="form-control" autoComplete="off" value={data.name} onChange={(e) => {setData((prev) => ({...prev, name:e.target.value}))}} />
                            <div className='my-2 text-start text-danger'></div>
                        </div>

                        <div className='col-3'>
                            <label htmlFor="itemnos" className='m-auto w-100 text-start mb-2'>Item Nos</label>
                            <input type='number' name='itemnos' id='itemnos' className="form-control" autoComplete="off" value={data.nos} onChange={(e) => {setData((prev) => ({...prev, nos:e.target.value}))}}/>
                            <div className='my-2 text-start text-danger'></div>
                        </div>

                        <div className='col-1'>
                            <label htmlFor="addItem" className='m-auto w-100 text-start mb-4'></label>
                            <button type="submit" name="addItem" id="addItem" className="btn btn-primary">+</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='container w-50 m-auto text-center'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Category</th>
                            <th>Item Name</th>
                            <th>Item nos</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataDB.map((item, index) => {
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.categoryname}</td>
                                <td>{item.name}</td>
                                <td>{item.nos}</td>
                                <td>
                                    <FaRegEdit className='w-25' onClick={() => {handleEdit(item.id, item.name, item.nos, item.categoryid)}}/>
                                    <FaRegTrashAlt onClick={() => {handleDelete(item.id)}}/>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ItemsCreationForm;