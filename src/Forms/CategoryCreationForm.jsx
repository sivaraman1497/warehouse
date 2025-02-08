import React, {useState, useEffect} from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

function CategoryCreationForm() 
{
    const [categoriesDB, setCategoriesDB] = useState([{}])
    const [category, setCategory] = useState({id:'', cName:''})
    const [fetchData, setFetchData] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const url = 'http://localhost:5000/getCategories';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then((res) => res.json())
        .then((data) => setCategoriesDB(data))
        .catch((err) => console.log(err))
    }, [fetchData])

    function handleSubmit(e)
    {
        e.preventDefault();
        let url = '';

        let categoryName = e.target.categoryname.value;

        if(categoryName !== '' && category.id != '')
        {
            url = 'http://localhost:5000/editCategory';
        }
        else
        {
            url = 'http://localhost:5000/createCategory';
        }

        makeRequest(url, 'POST', {id: category.id, categoryName: categoryName})
        category.cName = '';
        setFetchData(false);
    }

    function handleEdit(categoryid, categoryname)
    {
        setCategory({id: categoryid, cName: categoryname})
        category.cName = '';
        setFetchData(false);
    }

    function handleDelete(categoryid)
    {
        const url = 'http://localhost:5000/deleteCategory';
        makeRequest(url, 'DELETE', {categoryid})
        setFetchData(false);
    }

    function makeRequest(url, method, dataParam)
    {
        fetch(url, {
            method: method,
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataParam)
        })
        .then((res) => res.json())
        .then((data) => data.status == 'success' && setFetchData(true))
        .catch((err) => console.log(err)) 
    }

    return (
        <>
            <div>
                <button className="btn btn-secondary" onClick={() => {navigate(-1)}}>Back</button>
            </div>

            <div className='m-auto text-center container w-50 mt-5'>    
                <h3>Categories List</h3>
                <div className="row container">
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="col">
                            <input type="text" className="form-control" name="categoryname" id="categoryname" autoComplete="off" value={category.cName} onChange={(e) => setCategory({id: category.id, cName: e.target.value})}/>
                        </div>
                        
                        <div className="col mt-2">
                            <input type="submit" className="btn btn-primary" name="submit" id="submit"/>
                        </div>
                    </form>
                </div>

                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            categoriesDB.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPenToSquare} className="text-secondary" onClick={() => {handleEdit(category.id, category.name)}}/>
                                            <FontAwesomeIcon icon={faTrash} className="text-danger col-2" onClick={() => {handleDelete(category.id)}}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>  
        </>
    )
}

export default CategoryCreationForm